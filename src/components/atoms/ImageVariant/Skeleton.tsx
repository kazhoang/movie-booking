import { useTheme } from '@/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle, View, LayoutChangeEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	Easing,
} from 'react-native-reanimated';

interface SkeletonProps {
	style: ViewStyle;
	borderRadius?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ style, borderRadius = 0 }) => {
	const { colors } = useTheme();
	const shimmerPosition = useSharedValue(-1);
	const [containerWidth, setContainerWidth] = useState(0);

	const onLayout = (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;
		setContainerWidth(width);
	};

	const shimmerStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: shimmerPosition.value * containerWidth }],
		};
	});

	useEffect(() => {
		shimmerPosition.value = withRepeat(
			withTiming(1, {
				duration: 1200,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			false,
		);
	}, [shimmerPosition]);

	return (
		<View
			style={[
				StyleSheet.absoluteFill,
				{ backgroundColor: colors.gray100, borderRadius },
				style,
			]}
			onLayout={onLayout}
		>
			<Animated.View style={[shimmerStyle, styles.shimmerContainer]}>
				<LinearGradient
					colors={[colors.gray100, colors.gray400, colors.gray100]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.shimmerGradient}
				/>
			</Animated.View>
		</View>
	);
};

export default Skeleton;

const styles = StyleSheet.create({
	shimmerContainer: {
		...StyleSheet.absoluteFillObject,
	},
	shimmerGradient: {
		width: '200%',
		height: '100%',
	},
});
