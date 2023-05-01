export default function statDisplay({
  linesOfCode,
  errorsFound,
  nonLinesOfCode,
  numChecks,
  preprocessorConfig,
}) {
  return (
    <div>
      <h1 className="py-4 text-5xl text-slate-300 font-thin">
        {"Scan Statistic"}
      </h1>
      <div className="stats stats-vertical lg:stats-vertical shadow bg-neutral-focus">
        <div className="stat">
          <div className="stat-title">LOC Total</div>
          <div className="stat-value font-thin">{linesOfCode || 0}</div>
          <div className="stat-desc">Lines Of Code Total</div>
        </div>

        <div className="stat">
          <div className="stat-title">Error's Found</div>
          <div className="stat-value font-thin">{errorsFound || 0}</div>
          <div className="stat-desc">Error's Found by Analyzer</div>
        </div>

        <div className="stat">
          <div className="stat-title">LOC Not Analyzed</div>
          <div className="stat-value font-thin">{nonLinesOfCode || 0}</div>
          <div className="stat-desc">Lines Of Code Not Analyzed</div>
        </div>

        <div className="stat">
          <div className="stat-title">NOC Preformed</div>
          <div className="stat-value font-thin">{numChecks}</div>
          <div className="stat-desc">
            Number of Checks The Program Was Preformed Against
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Preprocessor Configuration</div>
          <div className="stat-value font-thin">{preprocessorConfig || 0}</div>
          <div className="stat-desc">Preprocessor Configuration</div>
        </div>
      </div>
    </div>
  );
}
