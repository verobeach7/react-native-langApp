import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
      duration: 2000,
    }).start(toggleUp);
  };

  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, -100, 100, 300],
    outputRange: [1, 0, 0, 1],
  });
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  Y_POSITION.addListener(() => {
    console.log("Y Value: ", Y_POSITION);
    console.log("opacity Value: ", opacity);
    console.log("borderRadius Value: ", borderRadius);
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            opacity,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
