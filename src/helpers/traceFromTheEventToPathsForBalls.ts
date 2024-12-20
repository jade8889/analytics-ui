export const splitIntoPathsAndNormalize = (trace: number[], numPaths: number): number[][] => {
  const paths: number[][] = [];
  const pathLength = Math.floor(trace.length / numPaths);

  for (let i = 0; i < numPaths; i++) {
    const start = i * pathLength;
    const end = i === numPaths - 1 ? trace.length : start + pathLength;
    const chunk = trace.slice(start, end).map((num) => (num % 2 === 0 ? 0 : 1));
    paths.push(chunk);
  }

  return paths;
};
