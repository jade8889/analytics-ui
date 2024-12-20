//i will take a list of strings and a list of numbers and i  want to take also a string
// then i will check when the string finds on the list of strings for the first time
//and i will return the number from the list of numbers that has the same index as the string on the list of strings

export const findTheMultiplier = (
  colorList: string[],
  multipliers: number[],
  colorThatIHave: string
) => {
  let index = colorList.indexOf(colorThatIHave);
  return multipliers[index];
};
// Make the same of a list of colorsThatIHave
export const findTheMultipliers = (
  colorList: string[],
  multipliers: number[],
  colorsThatIHave: string[]
) => {
  let result: number[] = [];
  colorsThatIHave.forEach((color) => {
    result.push(findTheMultiplier(colorList, multipliers, color));
  });
  return result;
};

export const generateBucketColors = (
  multipliersNumbers: number[],
  numColors: number
) => {
  const colors = [];
  let transparentCount = 0;

  // Count how many multipliers are less than 1, which will be transparent
  for (let i = 0; i < multipliersNumbers.length; i++) {
    if (multipliersNumbers[i] / 100 < 1) {
      transparentCount++;
    }
  }

  // Define the color gradient for non-transparent colors
  const colorSteps = Math.floor((numColors + 1 - transparentCount) / 2); // Number of steps for gradient
  const endColor = { r: 251, g: 124, b: 5 }; // Dark green
  const startColor = { r: 235, g: 28, b: 38 }; // Lighter green

  // Generate colors for the first half of the gradient
  for (let i = 0; i < colorSteps; i++) {
    const r = startColor.r + ((endColor.r - startColor.r) / colorSteps) * i;
    const g = startColor.g + ((endColor.g - startColor.g) / colorSteps) * i;
    const b = startColor.b + ((endColor.b - startColor.b) / colorSteps) * i;
    colors.push(`rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`);
  }

  // Add transparent colors for multipliers < 1
  for (let i = 0; i < transparentCount; i++) {
    colors.push(`rgba(248, 170, 0, 100)`); // Fully transparent white
  }

  // Add the mirrored part of the gradient for the second half
  for (let i = colorSteps - 1; i >= 0; i--) {
    const r = startColor.r + ((endColor.r - startColor.r) / colorSteps) * i;
    const g = startColor.g + ((endColor.g - startColor.g) / colorSteps) * i;
    const b = startColor.b + ((endColor.b - startColor.b) / colorSteps) * i;
    colors.push(`rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`);
  }

  return colors;
};

export const generateMultiplierText = (numbers: number[]) => {
  return numbers.map((num) => `${(num / 100).toFixed(1)}`);
};

export const checkIfTheMultipliersAreCorrect = async (
  multiplierHistory: number[],
  predefinedPath: number[][],
  multipliers: number[]
) => {
  const test = async () => {
    let result: number[] = [];
    predefinedPath.forEach((list) => {
      let count = 0;
      list.forEach((item) => {
        if (item === 1) {
          count++;
        }
      });
      result.push(count);
    });
    let expectedMultipliers: number[] = [];
    result.forEach((num) => {
      expectedMultipliers.push(multipliers[num]);
    });
    return multiplierHistory === expectedMultipliers;
  };
  await test();
};

//Make a function that returns the expexted multipliers
export const findTheExpectedMultipliers = (
  predefinedPath: number[][],
  multipliers: number[]
) => {
  let result: number[] = [];
  predefinedPath.forEach((list) => {
    let count = 0;
    list.forEach((item) => {
      if (item === 1) {
        count++;
      }
    });
    result.push(count);
  });
  let expectedMultipliers: number[] = [];
  result.forEach((num) => {
    expectedMultipliers.push(multipliers[num]);
  });
  return expectedMultipliers;
};

export const generateRandomPaths = (numberOfBalls: number) => {
  let result: number[][] = [];
  for (let i = 0; i < numberOfBalls; i++) {
    let list: number[] = [];
    for (let j = 0; j < 12; j++) {
      list.push(Math.round(Math.random()));
    }
    result.push(list);
  }
  return result;
};

//Also i want to take a list of the list of 0 and 1 and i want to find how many 1 got in each list and return a list of the numbers of 1 in each list

// export const findTheNumberOfOnes = (listOfLists: number[][]) => {
//   let result: number[] = [];
//   listOfLists.forEach((list) => {
//     let count = 0;
//     list.forEach((item) => {
//       if (item === 1) {
//         count++;
//       }
//     });
//     result.push(count);
//   });
//   return result;
// }
