import { useState } from "react";
import StatDisplay from "../components/statsDisplay";
//&nbsp;

export default function ScanDisplay({ scanResults }) {
  const [currentFile, setCurrentFile] = useState(null);
  const CppCheckResult = scanResults;
  const ScannedFilesList = Object.keys(CppCheckResult);

  function getFileName(e) {
    const { value } = e.target;
    setCurrentFile(value);
  }

  function getNonScannedLines() {
    var counter = 0;
    Object.keys(CppCheckResult[currentFile]["data"]).map((key, index) => {
      if (CppCheckResult[currentFile]["data"][key]["code"] === "") {
        counter += 1;
      }
    });
    return counter;
  }

  return (
    <div className="mx-16">
      <h1 className="py-4 text-5xl font-bold text-white">
        {currentFile || "Select File"}
      </h1>
      <select
        className="select select-warning w-full max-w-xs my-2"
        onChange={getFileName}
        defaultValue={"default"}
      >
        <option disabled value="default">
          Select A File
        </option>
        {ScannedFilesList.map((fileName) => (
          <option key={fileName}>{fileName}</option>
        ))}
      </select>
      <div className="grid grid-cols-12">
        <div className="col-span-8 bg-neutral">
          {CppCheckResult[currentFile] !== undefined ? (
            Object.keys(CppCheckResult[currentFile]["data"]).map(
              (key, index) => (
                <div key={key} tabindex={index} className="collapse ">
                  {CppCheckResult[currentFile]["data"][key]["status"] ===
                  "Checked" ? (
                    <div className="collapse-title text-xl text-success font-medium">
                      {CppCheckResult[currentFile]["data"][key]["code"]}
                    </div>
                  ) : CppCheckResult[currentFile]["data"][key]["status"] ===
                    "Error" ? (
                    <div className="collapse-title text-xl text-error font-medium">
                      {CppCheckResult[currentFile]["data"][key]["code"]}
                    </div>
                  ) : (
                    <div className="collapse-title text-xl text-warning font-medium">
                      {CppCheckResult[currentFile]["data"][key]["code"]}
                    </div>
                  )}
                  {CppCheckResult[currentFile]["data"][key]["message"] ===
                  "" ? (
                    <></>
                  ) : (
                    <div className="collapse-content text-white">
                      <p>
                        {CppCheckResult[currentFile]["data"][key]["message"]}
                      </p>
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <></>
          )}
        </div>
        <div className="col-span-3 px-2">
          {CppCheckResult[currentFile] ? (
            <StatDisplay
              linesOfCode={
                Object.keys(CppCheckResult[currentFile]["data"]).length
              }
              errorsFound={CppCheckResult[currentFile]?.token?.errs.length || 0}
              nonLinesOfCode={getNonScannedLines(
                CppCheckResult[currentFile]["data"]
              )}
              numChecks={CppCheckResult[currentFile]?.token?.num_checks || 0}
              preprocessorConfig={
                CppCheckResult[currentFile]?.token?.preprocessor_config ||
                "None"
              }
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        {CppCheckResult[currentFile]?.token ? (
          <div className="my-2 card bg-neutral shadow-xl text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                {"Token" || "Select File"}
              </h2>
              <p>{CppCheckResult[currentFile]?.token?.toks}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <h1 className="py-2 text-xl font-light text-white">
          <span className="flex">
            Scan Result:&nbsp;
            <p className="text-success">{currentFile ? 100 : 0}%</p>
          </span>
        </h1>
      </div>
    </div>
  );
}
