import React, { useRef } from "react";
import {
    ScrollView,
    StyleSheet,
    PanResponder,
    ViewStyle,
    View,
    PanResponderGestureState,
} from "react-native";

interface DraggableScrollViewProps {
    children: React.ReactNode;
}

const DraggableScrollView: React.FC<DraggableScrollViewProps> = ({
    children,
}) => {
    const scrollViewRef = useRef<ScrollView | null>(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                handleMove(gestureState);
            },
            onPanResponderRelease: () => {
                // Additional logic can be implemented here if needed
            },
        })
    ).current;

    const handleMove = (gestureState: PanResponderGestureState) => {
        const newPosition = -gestureState.dy;
        scrollViewRef.current?.scrollTo({ y: newPosition, animated: false });
    };

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                {children}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
});

export default DraggableScrollView;
