import React, { useEffect, useRef, useState } from "react";
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
  // 애니메이션이 끝나면 toggleUp에 의해 State가 변하므로 리랜더링이 일어남.
  // 이로 인해 모든 값이 initial value로 재설정되어 원래 자리로 돌아감.
  const [up, setUp] = useState(false);
  // 리랜더링되면 원래는 초기값으로 리랜더링되지만 useRef를 사용하면 이를 막을 수 있음
  const Y = useRef(new Animated.Value(0)).current;
  // up의 value를 바꿔줌
  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      // Bridge를 통하지 않고 모든 것을 Native로 보냄
      useNativeDriver: true,
    }).start(toggleUp);
  };
  // Animated State는 애니메이션 값을 보여줌
  Y.addListener(() => console.log("Animated State: ", Y));
  // Component State는 객체가 랜더링 되었던 위치의 value를 보여줌
  console.log("Component State: ", Y);
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
