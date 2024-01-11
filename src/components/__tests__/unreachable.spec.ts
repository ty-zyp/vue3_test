import { expect, test } from "vitest";

async function build(dir) {
  if (dir.includes("no-src")) throw new Error(`${dir}/src does not exist`);
}

const errorDirs = [
  "no-src-folder",
  // ...
];

test.each(errorDirs)('build fails with "%s"', async (dir) => {
  try {
    await build(dir);
    expect.unreachable("Should not pass build");
  } catch (err: any) {
    expect(err).toBeInstanceOf(Error);
    expect(err.stack).toContain("build");

    switch (dir) {
      case "no-src-folder":
        expect(err.message).toBe(`${dir}/src does not exist`);
        break;
      default:
        // to exhaust all error tests
        expect.unreachable("All error test must be handled");
        break;
    }
  }
});