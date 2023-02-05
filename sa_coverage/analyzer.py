from .loading import LoadingIcon
from re import match
from subprocess import check_output, STDOUT
from sys import stdout
from typing import Dict, List, Union

PATTERN_FILE_NAME_NO_CONFIG: str = r"^Checking \w+/\w+.cpp ...$"
PATTERN_FILE_NAME_WITH_CONFIG: str = r"^Checking \w+/\w+.cpp: \w+...$"
PATTERN_NUM_CONFIGS: str = r"^~~~ NUMBER OF PREPROCESSOR CONFIGS: \d+ ~~~$"
PATTERN_FILE_TOKENS: str = r"^~~~ FILE TOKENS: ~~~$"
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
    output_raw: Union[bytes, None] = None
    
    with LoadingIcon(f"Running {path_to_analyzer} {cmd_args}..."):
        output_raw = check_output(f"{path_to_analyzer} {cmd_args}", stderr=STDOUT, shell=True)

    with LoadingIcon(f"Parsing output..."):
        stdout: str = output_raw.decode()
        parsed: Dict[str, Dict[str, Dict[str, Union[int, str]]]] = _parse_stdout(stdout)

    return

def _parse_stdout(stdout: str) -> Dict[str, Dict[str, Dict[str, Union[int, str]]]]:
    """
    Accepts a '\n'-separated string and parses it into a usable dictionary.
    The string is intended to be the decoded stdout of a static analysis run.

    Parameters:
        stdout (str): The stdout of some static analysis.

    Returns:
        A dictionary of the following structure:
        {
            "path/to/file": {
                "preprocessor-config-name": {
                    "toks": "string-of-file-tokens",
                    "num_checks": number-of-checks-for-chunk (should be 27)
                }, ... 
            }, ...
        }
    """
    parsed: Dict[str, Dict[str, Dict[str, Union[int, str]]]] = {}
    stdout_split: List[str] = stdout.split('\n')

    is_next_line_toks: bool = False
    curr_fname: str = ""
    curr_config: str = ""

    for line in stdout_split:
        no_config = match(PATTERN_FILE_NAME_NO_CONFIG, line)
        with_config = match(PATTERN_FILE_NAME_WITH_CONFIG, line)
        if no_config:
            split_fname: List[str] = line.split(' ')[1:-1]
            curr_fname = ' '.join(split_fname)
            curr_config = ""
            parsed[curr_fname] = {curr_config: {}}
        
        elif with_config:
            split_line: List[str] = line.split(':')
            curr_fname = split_line[0].split()[1]
            curr_config = split_line[1].strip().split('.')[0]

            if parsed.get(curr_fname) is None:
                parsed[curr_fname] = {}
            parsed[curr_fname][curr_config] = {}

        elif is_next_line_toks:
            parsed[curr_fname][curr_config]["toks"] = line
            is_next_line_toks = False
        
        elif match(PATTERN_FILE_TOKENS, line):
            is_next_line_toks = True
            
        elif match(PATTERN_NUM_CHECKS, line):
            num_with_excess: str = line.split("Ran")[1]
            num_checks: int = int(num_with_excess.split("checks")[0])
            parsed[curr_fname][curr_config]["num_checks"] = num_checks

    return parsed

