You need to have a linter installed and to run it for every project -- it's a project requirement. Remember how we ran the linter and got all those errors? When I run your .eslintrc file on this project I get this: $ eslint lib/ lib/bitmap-header.js 
15:2 error Missing semicolon semi lib/bitmap-transform.js 
18:17 error Expected indentation of 12 spaces but found 16 indent 
24:17 error Expected indentation of 12 spaces but found 16 indent 
25:17 error Expected indentation of 12 spaces but found 16 indent 
26:17 error Expected indentation of 12 spaces but found 16 indent 
27:17 error Expected indentation of 12 spaces but found 16 indent 
29:17 error Expected indentation of 12 spaces but found 16 indent 
30:13 error Expected indentation of 8 spaces but found 12 indent 
32:13 error Expected indentation of 8 spaces but found 12 indent 
33:9 error Expected indentation of 4 spaces but found 8 indent 
35:9 error Expected indentation of 4 spaces but found 8 indent 
36:45 error Missing semicolon semi lib/invert-colors.js 
7:2 error Missing semicolon semi ✖ 13 problems (13 errors, 0 warnings)

### Rubric: 
#Tests: 2 / 3pts - 
+ 1 header unit test both work - 
+ .5 the readFile is nested inside the writeFile, so the tests will always pass. Not a "pinning" test - 
- .5 missing a unit test for the invert function, separate from the end to end test and npm scripts/package.json 
- 1 / 2pts - missing linter config and linter - package.json doesn't have a pretest script * Read Bitmap Meta Data and Correctly locate pixels -2.5 / 5pts - transforms the non-paletted correctly - transform doesn't work on paletted -- the isPaletted check is reading the wrong thing, see github comments * Successfully Apply Transform - 2.5 / 5pts - if you open the Palette-output, it's all black! That transform definitely isn't an inversion! * Project Design 
- 3.5 / 5pts - you need to have async read and write static methods for your bitmap class eg - there needs to be a read and a write method in the bitmap object - the write file is started, but it needs the error handling in it (if (err) console.log(err) or something) Notes - you NEED to have an .eslintrc file and to be running a linter. Marty doesn't mention these anymore, but it is still a requirement for all projects. Like having an package.json with the pretest, test, watch, etc, scripts.