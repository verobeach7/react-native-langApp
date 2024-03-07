import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";
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
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });
  // state가 변해도 panResponder가 설정된 AnimatedBox는 리랜더링 되지 않도록 useRef 사용
  const panResponder = useRef(
    // PanResponder 생성
    PanResponder.create({
      // 터치를 감지하도록 설정
      onStartShouldSetPanResponder: () => true,
      // 거리가 변하면 이를 AnimatedBox에 적용
      onPanResponderMove: (_, { dx, dy }) => {
        // 위치값 설정
        POSITION.setValue({
          // distance of x
          x: dx,
          // distance of y
          y: dy,
        });
      },
    })
  ).current;
  return (
    <Container>
      <AnimatedBox
        // panHanders가 가지고 있는 function들을 사용할 수 있게 설정
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: [...POSITION.getTranslateTransform()],
        }}
      />
    </Container>
  );
}
