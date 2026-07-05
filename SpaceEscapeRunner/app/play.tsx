import { useState, useEffect,useRef } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
   Animated,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
export default function PlayScreen() {
 const [rocketX, setRocketX] = useState(SCREEN_WIDTH / 2 - 25);
const ROCKET_Y = 610;
  const [asteroidX, setAsteroidX] = useState(
  Math.random() * (SCREEN_WIDTH - 60)
);
  const [asteroidY, setAsteroidY] = useState(-60);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

 useEffect(() => {
  if (gameOver) return;
  const timer = setInterval(() => {
    setAsteroidY((y) => {
      const nextY = y + 8;
 

      // Rocket position
      const rocketLeft = SCREEN_WIDTH / 2 - 25 + rocketX;
      const rocketRight = rocketLeft + 50;

      // Asteroid position
      const asteroidLeft = asteroidX;
      const asteroidRight = asteroidLeft + 40;

      // Collision
      const asteroidBottom = nextY + 40;

      

if (
  asteroidBottom >= ROCKET_Y &&
  nextY <= ROCKET_Y + 70 &&
  asteroidLeft + 40 >= rocketX &&
  asteroidLeft <= rocketX + 50
) {
  setGameOver(true);
  return nextY;
}
      if (y > 800) {
        setScore((s) => s + 1);
        setAsteroidX(Math.random() * (SCREEN_WIDTH - 60));
        return -60;
      }

      return nextY;
    });
  }, 30);

  return () => clearInterval(timer);
}, [rocketX, asteroidX, gameOver]);
useEffect(() => {
  if (gameOver) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }
}, [gameOver]);
 function restartGame() {
  setRocketX(SCREEN_WIDTH / 2 - 25);
  setAsteroidY(-60);
  setAsteroidX(Math.random() * (SCREEN_WIDTH - 60));
  setScore(0);
  setGameOver(false);
}     
    

  return (
    <View style={styles.container}>
  <Text
    style={{
      position: "absolute",
      top: 50,
      right: 20,
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    }}
>
  Score: {score}
</Text>

      {/* Asteroid */}
      <View
        style={[
          styles.asteroid,
          {
            top: asteroidY,
            left: asteroidX,
          },
        ]}
      />

      {/* Rocket */}
      <View
  style={[
    styles.rocket,
    {
      left: rocketX,
      bottom: 120,
    },
  ]}
/>
{gameOver && (
<View
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Animated.Text
      style={[
  {
    color: "red",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
  },
  {
    transform: [{ scale: scaleAnim }],
  },
]}
>
      GAME OVER
    </Animated.Text>

    <Pressable
      style={styles.button}
      onPress={restartGame}
    >
      <Text style={styles.buttonText}>Restart</Text>
    </Pressable>
  </View>
)}
      {/* Buttons */}
      {!gameOver && (
      <View style={styles.controls}>
        <Pressable
          style={styles.button}
          onPress={() => setRocketX((x) => x - 30)}
        >
          <Text style={styles.buttonText}>◀</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setRocketX((x) => x + 30)}
        >
          <Text style={styles.buttonText}>▶</Text>
        </Pressable>
      </View> 
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  rocket: {
  position: "absolute",
  width: 50,
  height: 70,
  backgroundColor: "deepskyblue",
  borderRadius: 8,
},
  asteroid: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 20,
    alignSelf: "center",
  },

  controls: {
    flexDirection: "row",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});