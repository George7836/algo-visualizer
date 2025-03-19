import { readdirSync } from 'fs';

const TEST_FOLDER = './__tests__/';
const COMPONENTS_FOLDER = './src/components/';
const TEST_FILE_EXTENSION = '.test.tsx';
const COMPONENT_FILE_EXTENSION = '.tsx';

function getFilenames(path: string, fileExtension: string) {
  const filesAndDirectories = readdirSync(path, { withFileTypes: true });
  const files = filesAndDirectories.filter((item) => item.isFile() && item.name.endsWith(fileExtension));
  const filenames = files.map((file) => file.name);

  return filenames;
}

function checkTests() {
  const testFilenames = getFilenames(TEST_FOLDER, TEST_FILE_EXTENSION);
  const componentFilenames = getFilenames(COMPONENTS_FOLDER, COMPONENT_FILE_EXTENSION);

  const missingTests: string[] = [];

  componentFilenames.forEach((componentFilename) => {
    const testFilename = componentFilename.replace(COMPONENT_FILE_EXTENSION, TEST_FILE_EXTENSION);

    if (!testFilenames.includes(testFilename)) {
      missingTests.push(testFilename);
    }
  });

  if (missingTests.length) {
    console.error('The following components are missing tests:');
    missingTests.forEach((missignTest) => console.error(`- ${missignTest}`));
    process.exit(1);
  } else {
    console.info('All components have corresponding test files.');
    process.exit(0);
  }
}

checkTests();
