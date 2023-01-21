from multiprocessing import Process
from os import system  # horrific design choice
from sys import stdout
from typing import List

def analyze(path_to_analyzer: str, cmd_args: List[str], /, *, to_stdout: bool=False) -> None:
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

    arg_string: str = f"{path_to_analyzer} {' '.join(cmd_args)}" 
    process: Process = Process(target=system, args=(arg_string,))
    process.start()
    process.join()

    # do something with stdout of the process

    stdout.flush()
    return

