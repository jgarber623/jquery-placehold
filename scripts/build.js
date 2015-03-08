#!/usr/bin/env node

var exec = require('child_process').exec,
	pkg = require('../package.json'),
	preamble = '/*!\n' +
		' * @name jQuery placehold (' +  pkg.homepage + ')\n' +
		' * @author ' + pkg.author.name + '\n' +
		' * @copyright (cc) ' + pkg.author.name + ' (' + pkg.author.url + ' and http://www.viget.com)\n' +
		' * \n' +
		' * Licensed under the ' + pkg.license + ' (http://www.gnu.org/licenses/gpl-2.0.html)\n' +
		' */\n';

exec('uglifyjs src/jquery.placehold.js --beautify "indent-level=2" --preamble "' + preamble + '" --output dist/jquery.placehold.js');
exec('uglifyjs src/jquery.placehold.js --compress --mangle --preamble "' + preamble + '" --output dist/jquery.placehold.min.js');