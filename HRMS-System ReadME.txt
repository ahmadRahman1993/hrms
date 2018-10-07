1. Attendance management - monitoring attendance device connetions(not necessary for running HRMS system).
2. RTEvents - for listening and inserting real time attendance events into "events" table of "hrms" database present at localhost.
3. Dot Net Framework is required for running RTEvents and the service inside our program responsible for truncating the events table re-inserting the the events data from device's database.
4. interlop dll file is also a requirement for running above programs.
5. nodejs is required.
6. apache server is required.
7. java is required for jenkins
8. for running all the programs required for hrms system, there are a couple of batch files (C://hrms.bat and C://RTEvents.bat) scheduled to run at startup
9. We use jenkins for continuous integration (deployment on github push - production-development and production-frontend branch).
10. mysql
11. git installation is required for jenkins
12. python is required
13. jenkins.war (C:\Apache24\htdocs) 
14. both the branches from github(production-development and production-frontend branch) are pulled into C:\Apache24\htdocs
15. apache24 and jenkins are installed as windows services and are automatically started on startup
