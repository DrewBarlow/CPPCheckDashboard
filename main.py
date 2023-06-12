import sa_coverage
from argparse import ArgumentParser, Namespace
from typing import List
import subprocess


def run_bash_script(script_path):
    process = subprocess.Popen(['bash', script_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # Wait for the process to finish and capture the output
    stdout, stderr = process.communicate()
    
    stdout = stdout.decode('utf-8')
    stderr = stderr.decode('utf-8')
    
    # Print the output
    print("Script output:")
    print(stdout)
    
    if stderr:
        print("Script errors:")
        print(stderr)


def main() -> None:
    parser: ArgumentParser = ArgumentParser()

    # this argument is horrific-- it should not be poking into the module folder.
    # TODO: find a better way to do this, or move cppcheck/ out here.
    parser.add_argument("-s", "--static-analyzer", type=str, default="./sa_coverage/cppcheck/cppcheck", help="The path to the analyzer.")
    parser.add_argument("-o", "--output-json", type=str, default="./json/parsed.json")

    # temp default args while devving
    parser.add_argument("-a", "--args", type=str, default="sample_data/", help="The command line arguments to pass to the analyzer.")
    args: Namespace = parser.parse_args()

    sa_coverage.analyze(args.static_analyzer, args.args, fname=args.output_json)
    return

if __name__ == "__main__":
    run_bash_script("make_dependencies.sh")
    main()
    run_bash_script("run_script.sh")

