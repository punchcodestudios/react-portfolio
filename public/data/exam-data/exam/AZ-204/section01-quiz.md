# AZ-204 Section 01 - Azure App Service Web Apps Quiz

## Multiple Choice Questions

1. What is the main purpose of an App Service Environment (ASE)?
   a) To provide basic web hosting capabilities
   b) To offer fully isolated and dedicated apps
   c) To manage database connections
   d) To handle authentication services

2. Which of the following best describes the App Service Plan's role?
   a) It manages individual application settings
   b) It serves as the "scale unit" for all contained apps
   c) It handles user authentication
   d) It stores application data

3. What happens to all apps when scaling occurs at the App Service Plan level?
   a) Only the primary app is affected
   b) Apps scale independently
   c) All apps in the plan are affected
   d) Scaling is disabled for all apps

4. Which continuous deployment option requires building and tagging images?
   a) GitHub deployment
   b) Container deployment
   c) ZIP file deployment
   d) FTP deployment

5. What is the purpose of sidecar containers in App Service?
   a) To provide primary application hosting
   b) To allow extra services to be decoupled from the container app
   c) To manage database connections
   d) To handle user authentication

6. Which role in App Service architecture handles incoming requests?
   a) Workers
   b) Front-ends
   c) Backends
   d) Controllers

7. Where are App Service application settings found in the Azure portal?
   a) Settings > Configuration > General settings
   b) Settings > Environment variables
   c) Settings > Connection strings
   d) Settings > Path mappings

8. What is the character limit for application setting names in App Service?
   a) They can contain any characters
   b) Only letters, numbers, and underscores
   c) Only letters and numbers
   d) Only letters

9. Which platform setting controls whether an app stays loaded even when there's no traffic?
   a) ARR affinity
   b) WebSockets
   c) Always On
   d) HTTPS Only

10. What is the primary purpose of App Service File System logging?
    a) Long-term data archival
    b) Temporary debugging
    c) Performance monitoring
    d) Security auditing

11. Which logging type is available on both Windows and Linux platforms?
    a) Web Server Logging
    b) Detailed error messages
    c) Application Logging
    d) Failed request tracing

12. What is the minimum App Service Plan tier required for autoscaling?
    a) Basic
    b) Standard
    c) S1 and up
    d) Premium only

13. How do Scale-Out actions differ from Scale-In actions in autoscaling rules?
    a) Scale-Out requires ALL rules to be true, Scale-In requires ANY rule to be true
    b) Scale-Out requires ANY rule to be true, Scale-In requires ALL rules to be true
    c) Both require ALL rules to be true
    d) Both require ANY rule to be true

14. What is the minimum duration for autoscale metric evaluation?
    a) 1 minute
    b) 3 minutes
    c) 5 minutes
    d) 10 minutes

15. Which App Service Plan tier first supports deployment slots?
    a) Basic
    b) Standard
    c) Premium
    d) Isolated

16. What is the character limit for site names before truncation occurs?
    a) 30 characters
    b) 40 characters
    c) 50 characters
    d) 59 characters

17. During slot swapping, what happens in the first step?
    a) All instances are immediately restarted
    b) Settings from target slot are applied to source slot
    c) The slots are directly swapped
    d) Local cache is initialized

18. Which of the following is a swappable setting that can be configured to stick to a slot?
    a) Custom domain names
    b) Scale settings
    c) App settings
    d) IP restrictions

19. How many steps are involved in the complete slot swapping process?
    a) 4 steps
    b) 5 steps
    c) 6 steps
    d) 8 steps

20. Which of the following is NOT a swappable setting during slot deployment?
    a) Handler mappings
    b) Public certificates
    c) Always On
    d) WebJobs content

---

## Answer Key with Explanations

**1. Answer: b) To offer fully isolated and dedicated apps**

- **Correct:** Your notes state "Use App service Environment (ASE) for fully isolated and dedicated apps"
- **Why others are wrong:**
  - a) Basic hosting is provided by regular App Service
  - c, d) These are not the primary purposes of ASE

**2. Answer: b) It serves as the "scale unit" for all contained apps**

- **Correct:** Your notes explicitly state "The App Service Plan is the 'scale unit' of all contained apps"
- **Why others are wrong:**
  - a, c, d) These are not the primary role of App Service Plans

**3. Answer: c) All apps in the plan are affected**

- **Correct:** Your notes state "scaling occurs at this level and affects all apps in plan"
- **Why others are wrong:**
  - a, b) Individual apps don't scale independently within a plan
  - d) Scaling is not disabled, it affects all apps

**4. Answer: b) Container deployment**

- **Correct:** Your notes list container deployment as requiring "Build and tag image" as an additional step
- **Why others are wrong:**
  - a, c, d) These deployment methods don't require image building and tagging

**5. Answer: b) To allow extra services to be decoupled from the container app**

- **Correct:** Your notes state "Sidecar containers allow extra services to be decoupled from container app"
- **Why others are wrong:**
  - a, c, d) These are not the purposes of sidecar containers

**6. Answer: b) Front-ends**

- **Correct:** Your notes define "Front-ends" as "roles that handle incoming requests"
- **Why others are wrong:**
  - a) Workers host customer workloads, not incoming requests
  - c, d) These are not roles mentioned in your notes

**7. Answer: b) Settings > Environment variables**

- **Correct:** Your notes specify "Found in portal under Settings > Environment variables"
- **Why others are wrong:**
  - a) This is for General settings
  - c) This is for Connection strings specifically
  - d) This is for Path mappings

**8. Answer: b) Only letters, numbers, and underscores**

- **Correct:** Your notes state "Can only contain letters, letters, numbers and underscore"
- **Why others are wrong:**
  - a, c, d) These don't match the specific restrictions mentioned

**9. Answer: c) Always On**

- **Correct:** Always On is the setting that keeps apps loaded even without traffic
- **Why others are wrong:**
  - a) ARR affinity relates to session management
  - b) WebSockets enables real-time communication
  - d) HTTPS Only enforces secure connections

**10. Answer: b) Temporary debugging**

- **Correct:** Your notes state "App Service File System logging is for temporary debugging"
- **Why others are wrong:**
  - a) Azure Blob Storage is used for long-term logging
  - c, d) These are not the primary purposes mentioned

**11. Answer: c) Application Logging**

- **Correct:** Your notes show Application Logging supports "Platform: Windows, Linux"
- **Why others are wrong:**
  - a, b, d) These are listed as "Platform: Windows" only

**12. Answer: c) S1 and up**

- **Correct:** Your notes state "Available Pricing Tiers: S1 and up" for autoscaling
- **Why others are wrong:**
  - a, b, d) These don't match the specific tier requirement

**13. Answer: b) Scale-Out requires ANY rule to be true, Scale-In requires ALL rules to be true**

- **Correct:** Your notes state "Scale-Out actions are applied if ANY rules evalute to true" and "Scale-In actions are applied only if ALL rules evaluate to true"
- **Why others are wrong:**
  - a) This reverses the requirements
  - c, d) These don't match the specific rules mentioned

**14. Answer: c) 5 minutes**

- **Correct:** Your notes specify "duration: (minimum of 5 min)"
- **Why others are wrong:**
  - a, b, d) These don't meet the minimum requirement specified

**15. Answer: b) Standard**

- **Correct:** Your notes state "Deployment slots are avaliable with the Standard Tier or better"
- **Why others are wrong:**
  - a) Basic tier doesn't support deployment slots
  - c, d) While these support slots, Standard is the minimum

**16. Answer: b) 40 characters**

- **Correct:** Your notes state "Site name is truncated to 40 characters"
- **Why others are wrong:**
  - a, c, d) These are not the truncation limit mentioned

**17. Answer: b) Settings from target slot are applied to source slot**

- **Correct:** Your notes describe this as the first step: "Apply applicable settings from target slot (typically production) to the source slot"
- **Why others are wrong:**
  - a) Restart happens after settings application
  - c) Direct swapping happens later
  - d) Cache initialization is step 3

**18. Answer: c) App settings**

- **Correct:** Your notes list "App settings (can be configured to stick)" under swappable settings
- **Why others are wrong:**
  - a) Custom domain names are non-swappable
  - b) Scale settings are non-swappable
  - d) IP restrictions are non-swappable

**19. Answer: c) 6 steps**

- **Correct:** Your notes explicitly state "6 step process" for slot swapping
- **Why others are wrong:**
  - a, b, d) These don't match the number of steps described

**20. Answer: c) Always On**

- **Correct:** Always On is listed under "Non swappable settings" in your notes
- **Why others are wrong:**
  - a, b, d) These are all listed under "Swappable settings"
