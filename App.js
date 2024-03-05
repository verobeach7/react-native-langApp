import React, { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
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
  const Y = new Animated.Value(0);

  const moveUp = () => {
    Animated.spring(Y, {
      toValue: 200,
      // bounciness와 friction을 함께 사용하지 못함(에러 발생)
      // bounciness: 50,
      tension: 50,
      friction: 1,
      // Bridge를 통하지 않고 모든 것을 Native로 보냄
      useNativeDriver: true,
    }).start();
  };
  // console.log(Y); // Y값이 변하지 않음(React Component를 리랜더링하는 것이 아니기 때문)
  Y.addListener(() => console.log(Y));
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{ translateY: Y }],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}
