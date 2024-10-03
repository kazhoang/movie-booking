import { Component } from 'react';
import { ImageProps, ImageURISource } from 'react-native';
import RNFS from 'react-native-fs';
const SHA1 = require('crypto-js/sha1');
import RNFetchBlob from 'react-native-blob-util';

const s4 = () =>
	Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
const BASE_DIR = RNFS.CachesDirectoryPath + '/react-native-img-cache';
export type CacheHandler = (path: string) => void;

export interface CachedImageURISource extends ImageURISource {
	uri: string;
}

type CacheEntry = {
	source: CachedImageURISource;
	downloading: boolean;
	handlers: CacheHandler[];
	path: string | undefined;
	immutable: boolean;
	task?: any;
};

export class ImageCache {
	private getPath(uri: string, immutable?: boolean): string {
		let path = uri.substring(uri.lastIndexOf('/'));
		path =
			path.indexOf('?') === -1
				? path
				: path.substring(path.lastIndexOf('.'), path.indexOf('?'));
		const ext =
			path.indexOf('.') === -1 ? '.jpg' : path.substring(path.indexOf('.'));
		if (immutable === true) {
			return BASE_DIR + '/' + SHA1(uri) + ext;
		} else {
			return (
				BASE_DIR +
				'/' +
				s4() +
				s4() +
				'-' +
				s4() +
				'-' +
				s4() +
				'-' +
				s4() +
				'-' +
				s4() +
				s4() +
				s4() +
				ext
			);
		}
	}

	private static instance: ImageCache;

	private constructor() {}

	static get(): ImageCache {
		if (!ImageCache.instance) {
			ImageCache.instance = new ImageCache();
		}
		return ImageCache.instance;
	}

	private cache: { [uri: string]: CacheEntry } = {};

	clear() {
		this.cache = {};
		return RNFetchBlob.fs.unlink(BASE_DIR);
	}

	on(source: CachedImageURISource, handler: CacheHandler, immutable?: boolean) {
		const { uri } = source;
		if (!this.cache[uri]) {
			this.cache[uri] = {
				source,
				downloading: false,
				handlers: [handler],
				immutable: immutable === true,
				path: immutable === true ? this.getPath(uri, immutable) : undefined,
			};
		} else {
			this.cache[uri].handlers.push(handler);
		}
		this.get(uri);
	}

	dispose(uri: string, handler: CacheHandler) {
		const cache = this.cache[uri];
		if (cache) {
			cache.handlers.forEach((h, index) => {
				if (h === handler) {
					cache.handlers.splice(index, 1);
				}
			});
		}
	}

	bust(uri: string) {
		const cache = this.cache[uri];
		if (cache !== undefined && !cache.immutable) {
			cache.path = undefined;
			this.get(uri);
		}
	}

	cancel(uri: string) {
		const cache = this.cache[uri];
		if (cache && cache.downloading) {
			cache.task.cancel();
		}
	}

	private download(cache: CacheEntry) {
		const { source } = cache;
		const { uri } = source;
		if (!cache.downloading) {
			const path = this.getPath(uri, cache.immutable);
			cache.downloading = true;
			const method: any = source.method ? source.method : 'GET';
			cache.task = RNFetchBlob.config({ path }).fetch(
				method,
				uri,
				source.headers,
			);
			cache.task
				.then(() => {
					cache.downloading = false;
					cache.path = path;
					this.notify(uri);
				})
				.catch(() => {
					cache.downloading = false;
					RNFetchBlob.fs.unlink(path);
				});
		}
	}

	private get(uri: string) {
		const cache = this.cache[uri];
		if (cache.path) {
			// We check here if IOS didn't delete the cache content
			RNFetchBlob.fs.exists(cache.path).then((exists: boolean) => {
				if (exists) {
					this.notify(uri);
				} else {
					this.download(cache);
				}
			});
		} else {
			this.download(cache);
		}
	}

	private notify(uri: string) {
		const handlers = this.cache[uri].handlers;
		handlers.forEach(handler => {
			handler(this.cache[uri].path as string);
		});
	}
}

export interface CachedImageProps extends ImageProps {
	mutable?: boolean;
}

export interface CustomCachedImageProps extends CachedImageProps {
	component: new () => Component<any, any>;
}

export interface CachedImageState {
	path: string | undefined;
}
