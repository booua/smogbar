export const LoadingIndicator = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        WebkitAnimationPlayState: "running",
        animationPlayState: "running",
        WebkitAnimationDelay: "0s",
        animationDelay: "0s",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: "99999",
        backgroundColor: "#212124"
      }}
      display="block"
      position="absolute"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#8cd0e5"
        style={{
          WebkitAnimationPlayState: "running",
          animationPlayState: "running",
          WebkitAnimationDelay: "0s",
          animationDelay: "0s",
        }}
      >
        <animate
          attributeName="r"
          begin="-0.49019607843137253s"
          calcMode="spline"
          dur="0.9803921568627451s"
          keySplines="0 0.2 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="0;18"
        ></animate>
        <animate
          attributeName="opacity"
          begin="-0.49019607843137253s"
          calcMode="spline"
          dur="0.9803921568627451s"
          keySplines="0.2 0 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#376888"
        style={{
          WebkitAnimationPlayState: "running",
          animationPlayState: "running",
          WebkitAnimationDelay: "0s",
          animationDelay: "0s",
        }}
      >
        <animate
          attributeName="r"
          calcMode="spline"
          dur="0.9803921568627451s"
          keySplines="0 0.2 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="0;18"
        ></animate>
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="0.9803921568627451s"
          keySplines="0.2 0 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </circle>
    </svg>
  );
}

