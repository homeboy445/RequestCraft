const TextFormatter = (text: string, trimLimit: number) => {
  if (text.length <= trimLimit) {
    return <>{text}</>;
  } else {
    const trimmedText = text.slice(
      0,
      Math.min(trimLimit || text.length, text.length)
    );
    return <>{trimmedText}...</>;
  }
};

export default TextFormatter;
