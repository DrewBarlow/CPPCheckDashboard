from subprocess import check_output, STDOUT
from sys import stdout
from typing import List

def analyze(path_to_analyzer: str, cmd_args: str, /, *, to_stdout: bool=False) -> None:
    """
    Accepts command line arguments to be passed to a static analyzer
    as if we were just running that analyzer.

    Parameters:
        path_to_analyzer (str): The analyzer in question
        cmd_args (List[str]): The arguments to be passed to the analyzer.
        to_stdout (bool, optional): Generates a .html file if False, otherwise prints to stdout.

    Returns:
        None.
    """

    output: bytes = check_output(f"{path_to_analyzer} {cmd_args}", stderr=STDOUT, shell=True)
    print(output.decode())
    
    return

