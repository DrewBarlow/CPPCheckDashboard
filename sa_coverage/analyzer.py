from re import match
from subprocess import check_output, STDOUT
from sys import stdout
from typing import Dict, List, Union

PATTERN_FILE_NAME: str = r"^Checking \s+/\s+ ..."
PATTERN_NUM_CONFIGS: str = r"^~~~ NUMBER OF PREPROCESSOR CONFIGS: \d+ ~~~$"
PATTERN_FILE_TOKENS: str = r"^~~~ FILE TOKENS: ~~~$"
# PATTERN_NUM_FILES_CHECKED: str = r"^\d+/\d+ files checked \d+% done$"
PATTERN_NUM_CHECKS: str = r"^~~~ Ran \d+ checks for this above chunk ~~~$"


def analyze(path_to_analyzer: str, cmd_args: str, /, *, to_stdout: bool=False) -> None:
    """
    Accepts command line arguments to be passed to a static analyzer
    as if we were just running that analyzer.

    Parameters:
        path_to_analyzer (str): The analyzer in question.
        cmd_args (str): The arguments to be passed to the analyzer.
        to_stdout (bool, optional): Generates a .html file if False, otherwise prints to stdout.

    Returns:
        None.
    """

    output_raw: bytes = check_output(f"{path_to_analyzer} {cmd_args}", stderr=STDOUT, shell=True)
    stdout: str = output_raw.decode()
    parsed: Dict[str, Dict[str, Union[int, str]]] = _parse_stdout(stdout)

    return

def _parse_stdout(stdout: str) -> Dict[str, Dict[str, Union[int, str]]]:
    """
    Accepts a '\n'-separated string and parses it into a usable dictionary.
    The string is intended to be the decoded stdout of a static analysis run.

    Parameters:
        stdout (str): The stdout of some static analysis.

    Returns:
        A dictionary of the following structure:
        {
            "path/to/file": {
                "toks": "string-of-file-tokens",
                "num_configs": number-of-preprocessor-configs,
                "num_checks": number-of-checks-for-chunk (should be 27)
            }, ...
        }
    """
    parsed: Dict[str, Dict[str, Union[int, str]]] = {}
    stdout_split: List[str] = stdout.split('\n')

    is_next_line_toks: bool = False
    curr_fname: str = ""

    for line in stdout_split:
        if match(PATTERN_FILE_NAME, line):
            # files and names have spaces.
            # cut off the first and last words to handle this
            split_fname: List[str] = line.split(' ')[1:-1]
            curr_fname = ' '.join(split_fname)
            parsed[curr_fname] = {}

        elif is_next_line_toks:
            pass
            is_next_line_toks = False
        
        elif match(PATTERN_FILE_TOKENS, line):
            is_next_line_toks = True
            
        elif match(PATTERN_NUM_CONFIGS, line):
            pass

        elif match(PATTERN_NUM_CHECKS, line):
            pass

        # elif match(PATTERN_NUM_FILES_CHECKED, line):
        #     pass

    return parsed

