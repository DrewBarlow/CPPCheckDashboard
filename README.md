## Planning the backend for a coverage dashboard

### Notes:
  * `sample_data.zip` contains a randomly selected chunk of files from the SARD dataset.
  * The chunk in question pertains to CWE36, and 78 files are present.

### PLANNING:
#### Goal:
  * Generate a .html file that summarizes what sections of code were covered by CPPCheck.  
    * i.e., highlight covered sections with green and uncovered sections with red.  
    * Comments will be ignored always.  
    * Need to take into account multiple preprocessor configs.  

#### Approaches:
  1. Configure CPPCheck to generate these files.  
      * Pros  
          - Faster execution time.  
          - Easy to handle variability of multithreaded execution (global shared array + mutex).  
      * Cons  
          - More difficult to format.  
          - Would take significantly longer to implement.  
          - Requires HEAVY modification of source code.  
  2. Create some locally-hosted server to accept results of execution as it happens.  
      * Explained differently, use sockets and a threading TCP server to record results and handle them.  
      * Pros  
          - Server would be easily implementable in Python.  
          - Less time to implement.  
      * Cons  
          - I'm iffy with c-style sockets.  
          - Requires more computation than is really needed.  
          - Requires HEAVY modification of source code.  
  3. Use a wrapper program to run CPPCheck and generate the files accordingly.  
      * Explained differently, spawn a cppcheck process and capture stdout.  
      * Pros  
          - Arguably the simplest solution in terms of being able to apply it to other analyzers.  
              - Other analyzers would just need to be modified to print similar output to CPPCheck.  
          - Relatively quick to implement.  
      * Cons  
          - A hurdle would be handling the variability of stdout due to multithreading.  

