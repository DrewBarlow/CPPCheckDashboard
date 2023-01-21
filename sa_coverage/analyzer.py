from typing import List

def analyze(path_to_analyzer: str, args: List[str], /, *, stdout: bool=False) -> None:
    """
    Accepts command line arguments to be passed to a static analyzer
    as if we were just running that analyzer.

    Parameters:
        path_to_analyzer (str): The analyzer in question
        args (List[str]): The arguments to be passed to the analyzer.
        stdout (bool, optional): Generates a .html file if False, otherwise prints to stdout.

    Returns:
        None.
    """
    print(path_to_analyzer, args)
    return

