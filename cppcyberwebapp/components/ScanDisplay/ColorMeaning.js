import React from "react";

export default function ColorMeaning() {
  return (
    <div>
      <div className="card p-4 my-4 w-48 bg-black">
        <div>
          <span class="badge badge-xs bg-success"></span> Scanned
        </div>
        <div>
          <span class="badge badge-xs bg-warning"></span> Non-Scanned
        </div>
        <div>
          <span class="badge badge-xs bg-error"></span> Error
        </div>
      </div>
    </div>
  );
}
