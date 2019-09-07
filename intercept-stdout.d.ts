declare module 'intercept-stdout' {
	type hookFunction = (txt: string) => string | void;
	type unhookFunction = () => void;

	function intercept(
		stdoutIntercept: hookFunction,
		stderrIntercept?: hookFunction,
	): unhookFunction;

	export = intercept;
}
