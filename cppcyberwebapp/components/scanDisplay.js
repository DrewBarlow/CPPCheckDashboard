import { useState } from "react";
import StatDisplay from "../components/statsDisplay";
//&nbsp;

export default function ScanDisplay({ scanResults }) {
  const [currentFile, setCurrentFile] = useState(null);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPageCount] = useState(0);
  const [pageIterator, setPageIterator] = useState(1000);

  const CppCheckResult = scanResults;
  const ScannedFilesList = Object.keys(CppCheckResult);

  function getFileName(e) {
    const { value } = e.target;
    const selectedFileCode = CppCheckResult[value]["data"];
    const totalCodeLines = Object.keys(selectedFileCode).length;
    setPageCount(Math.ceil(totalCodeLines / pageIterator));
    setCurrentPageCount(1);
    setCurrentFile(value);
  }

  function getPageIterator(e) {
    const { value } = e.target;
    const pageIterator = parseInt(value.split(" ")[0]);
    setPageIterator(pageIterator);
    const totalCodeLines = Object.keys(
      CppCheckResult[currentFile]["data"]
    ).length;
    setPageCount(Math.ceil(totalCodeLines / pageIterator));
    setCurrentPageCount(1);
  }

  function getNextPage() {
    if (currentPage < pageCount) {
      const newNextPage = currentPage + 1;
      setCurrentPageCount(newNextPage);
      //window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function getPrevPage() {
    if (currentPage > 1) {
      const newPrevPage = currentPage - 1;
      setCurrentPageCount(newPrevPage);
      //window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function changePage(e) {
    const { value } = e.target;
    if (value >= 1 && value <= pageCount) {
      setCurrentPageCount(value);
    }
  }

  function getNonScannedLines() {
    let counter = 0;
    Object.keys(CppCheckResult[currentFile]["data"]).map((key, index) => {
      if (CppCheckResult[currentFile]["data"][key]["code"] === "") {
        counter += 1;
      }
    });
    return counter;
  }

  return (
    <div className="mx-16">
      <div>
        <div className="flex items-center">
          <h1 className="py-4 text-6xl text-slate-300 font-thin text-center break-all">
            {currentFile || "Select File"}
          </h1>
        </div>
      </div>
      <div>
        <div>
          <select
            className="select select-info w-full max-w-lg my-2"
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
        </div>
        <div>
          {currentFile ? (
            <select
              className="select select-info w-full max-w-xs my-2"
              onChange={getPageIterator}
              defaultValue={"default"}
            >
              <option disabled value="default">
                Select Pagination Iteration - Default 1000
              </option>
              <option key={50}>50 Lines Of Page</option>
              <option key={100}>100 Lines Per Page</option>
              <option key={1000}>1000 Lines Per Page</option>
              <option key={5000}>5000 Lines Per Page</option>
            </select>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-8 bg-neutral card">
          {CppCheckResult[currentFile] !== undefined ? (
            Object.keys(CppCheckResult[currentFile]["data"])
              .slice(
                (currentPage - 1) * pageIterator,
                currentPage * pageIterator
              )
              .map((key, index) => (
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
              ))
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
      {pageCount > 1 ? (
        <div className=" py-4">
          <button className="btn rounded-r-none" onClick={getPrevPage}>
            «
          </button>
          <div className="dropdown">
            <label tabindex="0" className="btn rounded-none">
              Page {currentPage}/{pageCount}
            </label>
            <div
              tabindex="0"
              className="dropdown-content card card-compact w-64 p-2 shadow bg-neutral-focus
              text-primary-content"
            >
              <div className="card-body">
                <h3 className="card-title">Navigate Page</h3>
                <p>Jump to a specific page</p>
                <input
                  type="number"
                  placeholder="Place in the page"
                  className="input w-full max-w-xs"
                  min={1}
                  max={pageCount}
                  onChange={changePage}
                />
              </div>
            </div>
          </div>
          <button className="btn rounded-l-none" onClick={getNextPage}>
            »
          </button>
        </div>
      ) : (
        <></>
      )}
      <div>
        {CppCheckResult[currentFile]?.token ? (
          <div className="my-2 card bg-neutral shadow-xl text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-4xl font-thin">
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
