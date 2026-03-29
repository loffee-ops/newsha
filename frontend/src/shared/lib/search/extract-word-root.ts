export function extractWordRoot(word: string): string {
    return word.replace(/(ing|ness|nesses|s|es|ed|ія|ість|ого|ий|ій|е|а|у|ою|і)$/g, "");
}
