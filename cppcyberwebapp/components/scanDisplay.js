import { useState } from "react";
import StatDisplay from "../components/statsDisplay";
//&nbsp;

export default function ScanDisplay({ scanResults }) {
  const [currentFile, setCurrentFile] = useState(null);
  const CppCheckResult = scanResults;
  const ScannedFilesList = Object.keys(CppCheckResult["results"]);

  function getFileName(e) {
    const { value } = e.target;
    setCurrentFile(value);
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
          {CppCheckResult["results"][currentFile] !== undefined ? (
            Object.keys(CppCheckResult["results"][currentFile]["data"]).map(
              (key, index) => (
                <div key={key} tabindex={index} className="collapse ">
                  {CppCheckResult["results"][currentFile]["data"][key][
                    "status"
                  ] === "success" ? (
                    <div className="collapse-title text-xl text-success font-medium">
                      {
                        CppCheckResult["results"][currentFile]["data"][key][
                          "code"
                        ]
                      }
                    </div>
                  ) : CppCheckResult["results"][currentFile]["data"][key][
                      "status"
                    ] === "error" ? (
                    <div className="collapse-title text-xl text-error font-medium">
                      {
                        CppCheckResult["results"][currentFile]["data"][key][
                          "code"
                        ]
                      }
                    </div>
                  ) : (
                    <div className="collapse-title text-xl text-warning font-medium">
                      {
                        CppCheckResult["results"][currentFile]["data"][key][
                          "code"
                        ]
                      }
                    </div>
                  )}
                  {CppCheckResult["results"][currentFile]["data"][key][
                    "message"
                  ] === "" ? (
                    <></>
                  ) : (
                    <div className="collapse-content text-white">
                      <p>
                        {
                          CppCheckResult["results"][currentFile]["data"][key][
                            "message"
                          ]
                        }
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
          {CppCheckResult["results"][currentFile] ? (
            <StatDisplay
              linesOfCode={
                CppCheckResult["results"][currentFile]["stats"]["linesOfCode"]
              }
              errorsFound={
                CppCheckResult["results"][currentFile]["stats"]["Issues"]
              }
              nonLinesOfCode={
                CppCheckResult["results"][currentFile]["stats"][
                  "nonLinesOfCode"
                ]
              }
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        {CppCheckResult["results"][currentFile]?.token ? (
          <div className="my-2 card bg-neutral shadow-xl text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                {"Token" || "Select File"}
              </h2>
              <p>{CppCheckResult["results"][currentFile]?.token?.toks}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <h1 className="py-2 text-xl font-light text-white">
          <span className="flex">
            Scan Result:&nbsp;
            <p className="text-success">
              {currentFile
                ? CppCheckResult["results"][currentFile]["stats"]["scanPercent"]
                : 0}
              %
            </p>
          </span>
        </h1>
      </div>
    </div>
  );
}
