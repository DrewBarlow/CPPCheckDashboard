import subprocess
import bs4
import re


def runExportCommand():
    # obtain the node module packages
    installation_status = subprocess.run("npm install", shell=True, cwd="./")
    if installation_status.returncode == 0:
        print(
            "[+] The node modules have been installed %d"
            % installation_status.returncode
        )
    else:
        print(
            "[-] The node modules have not been installed %d"
            % installation_status.returncode
        )

    # runs the export command to obtain the raw html of the program
    export_build = subprocess.run("npm run export", shell=True, cwd="./")
    if export_build.returncode == 0:
        print(
            "[+] The npm run export command succeeded: exit code %d"
            % export_build.returncode
        )
    else:
        print(
            "[-] The npm run export command failed: exit code %d"
            % export_build.returncode
        )


def pathCorrection():
    try:
        # load the generated index.html file
        with open("./out/index.html") as outputHTML:
            indexText = outputHTML.read()
            soupIndex = bs4.BeautifulSoup(indexText, features="html.parser")

        # fixes the path string by adding the . infront of the link's href string (allows for the css to load in)
        for link in soupIndex.findAll("link"):
            if link.has_attr("href") and str(link["href"])[0] != ".":
                link["href"] = "." + link["href"]

        # fixes the path string by adding the . infront of the script's src string (allows for the js to load in)
        for script in soupIndex.findAll("script"):
            if script.has_attr("src") and str(script["src"])[0] != ".":
                script["src"] = "." + script["src"]

        # saves the changes to the index.html file
        with open("./out/index.html", "w") as outf:
            outf.write(str(soupIndex))

        print(
            "[+] Successfully Changed The Path Property: Corrected the file pathing for the link tag and script tag"
        )
    except:
        print(
            "[-] Failed Changing Path Property: Failed To Correct the file pathing for the link tag and script tag"
        )


def openGeneratedFile():
    # opens the index.html file in the browser
    runApplication = subprocess.run("start ./out/index.html", shell=True, cwd="./")
    if runApplication.returncode == 0:
        print(
            "[+] Application Successfully Started: exit code %d"
            % runApplication.returncode
        )
    else:
        print(
            "[-] Application Failed To Start: exit code %d" % runApplication.returncode
        )


def main():
    runExportCommand()
    pathCorrection()
    openGeneratedFile()


main()
