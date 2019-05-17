/** sformat prototype as argument replacement.
   "{0} is dead, but {1} is alive! {0} {2}".sformat("ASP", "ASP.NET")
   Output: "ASP is dead, but ASP.NET is alive! ASP {2}"
*/
if (!String.prototype.sformat) {
	String.prototype.sformat = function() {
		const args = arguments;
		return this.replace(/{(\d+)}/g, (match, number) => {
			return typeof args[number] !== 'undefined' ? args[number] : match;
		});
	};
}
