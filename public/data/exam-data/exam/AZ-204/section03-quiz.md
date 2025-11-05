# AZ-204 Section 03 - Azure Blob Storage Quiz

## Multiple Choice Questions

1. What type of storage is used for storing massive amounts of unstructured data that doesn't adhere to a particular model or definition?
   a) Azure Table Storage
   b) Azure Blob Storage
   c) Azure Queue Storage
   d) Azure File Storage

2. What is the top level container for Azure Blob Storage?
   a) Resource Group
   b) Subscription
   c) Azure Storage Account
   d) Blob Container

3. Which type of Azure Storage account supports Blob Storage, Queue storage, Table Storage, and Azure Files?
   a) Premium Block Blob
   b) Premium Page Blobs
   c) Premium File Share
   d) Standard

4. Which type of Azure Storage account only supports Blob Storage?
   a) Standard
   b) Premium File Share
   c) Premium Block Blob
   d) Premium Page Blobs

5. Which Access Tier is optimized for frequent access of objects and has the highest storage costs but lowest access costs?
   a) Cool
   b) Hot
   c) Cold
   d) Archive

6. Which Access Tier is optimized for storing large amounts of data that is infrequently accessed and stored for a minimum of 30 days?
   a) Hot
   b) Cool
   c) Cold
   d) Archive

7. Which Access Tier is optimized for storing data that is infrequently accessed and stored for a minimum of 90 days?
   a) Hot
   b) Cool
   c) Cold
   d) Archive

8. Which Access Tier is available only for individual block blobs and optimized for data that can tolerate several hours of retrieval latency?
   a) Hot
   b) Cool
   c) Cold
   d) Archive

9. What type of blobs are made up of blocks of data that can be managed individually and can store up to about 190.7 TiB?
   a) Page Blobs
   b) Block Blobs
   c) Append Blobs
   d) Binary Blobs

10. What type of blob is ideal for scenarios such as logging data from virtual machines?
    a) Block Blobs
    b) Page Blobs
    c) Append Blobs
    d) Binary Blobs

11. What type of blob can store random access Virtual Hard Drive (VHD) files up to 8 TB?
    a) Block Blobs
    b) Append Blobs
    c) Page Blobs
    d) Binary Blobs

12. Which version of client-side encryption uses Galois/Counter Mode (GCM) mode with AES?
    a) Version 1
    b) Version 2
    c) Version 3
    d) Version 4

13. At what level are Data Storage limits set?
    a) Container level
    b) Blob level
    c) Account level
    d) Resource group level

14. What is a lifecycle management policy?
    a) A single rule in XML format
    b) An array in JSON format containing between 1 and 100 defined rules
    c) A configuration file in YAML format
    d) A PowerShell script

15. How many items must each lifecycle management policy rule include?
    a) One item: Filter set
    b) One item: Action set
    c) Two items: Filter set and Action set
    d) Three items: Filter set, Action set, and Condition set

16. If more than one filter is defined in a lifecycle management rule, what logical operator is used for evaluation?
    a) OR
    b) AND
    c) NOT
    d) XOR

17. If you define more than one action on the same blob, which action does lifecycle management apply?
    a) The most expensive action
    b) The least expensive action
    c) The first action defined
    d) All actions simultaneously

18. What are the three ways to add a blob-storage policy through the Azure portal?
    a) Azure Portal List View, Azure Portal Code View, Azure CLI
    b) Azure Portal, PowerShell, REST API
    c) Azure CLI, PowerShell, ARM Template
    d) Azure Portal, Azure CLI, SDK

19. What extra step must be taken to read or modify a blob that is in the Archive access tier?
    a) Change the storage account type
    b) Rehydrate the blob to an online tier
    c) Convert it to a different blob type
    d) Move it to a different container

20. In which rehydration priority setting might the process take up to 15 hours?
    a) High Priority
    b) Standard Priority
    c) Low Priority
    d) Express Priority

21. Which rehydration priority setting might complete in under one hour for objects under 10 GB in size?
    a) Standard Priority
    b) High Priority
    c) Express Priority
    d) Fast Priority

22. Which operation is used to change a blob's access tier for rehydration from Archive?
    a) Copy Blob
    b) Set Blob Tier
    c) Move Blob
    d) Update Blob

23. Which storage account type supports lifecycle policies?
    a) Standard
    b) Premium Block Blob
    c) General Purpose v2
    d) Premium File Share

24. How many classes are provided by the Azure Storage client libraries in .NET for Blob Storage?
    a) Three
    b) Four
    c) Five
    d) Six

25. What is the purpose of a BlobServiceClient object?
    a) To interact with individual blobs
    b) To interact with containers only
    c) To interact with resources at the storage account level
    d) To manage metadata only

26. Can you create a BlobContainerClient object directly without using a BlobServiceClient?
    a) Yes, it's possible
    b) No, you must use BlobServiceClient first
    c) Only with Premium accounts
    d) Only with Standard accounts

27. What is the size limit of all metadata key/value pairs for a Blob Container?
    a) 4KB
    b) 8KB
    c) 16KB
    d) 32KB

28. What happens if you call PUT without any headers while setting Metadata for a Blob Container?
    a) An error is returned
    b) Default metadata is applied
    c) All existing metadata on the resource is cleared
    d) The operation is ignored

29. What is the header prefix for setting a metadata property on a Blob Container?
    a) x-ms-blob-
    b) x-ms-meta-
    c) x-ms-container-
    d) x-ms-storage-

30. Which of the following classes allows you to manipulate both Azure Storage containers and their blobs?
    a) BlobClient
    b) BlobServiceClient
    c) BlobContainerClient
    d) BlobUriBuilder

---

## Answer Key with Explanations

**1. Answer: b) Azure Blob Storage**

- **Correct:** Your notes specifically state "Azure blob storage" is used for storing massive amounts of unstructured data.
- **Why others are wrong:**
  - a, c, d) These storage types are designed for structured or semi-structured data

**2. Answer: c) Azure Storage Account**

- **Correct:** Your notes state "An Azure Storage account is the top level container for Azure Blob Storage."
- **Why others are wrong:**
  - a, b, d) These are higher-level or lower-level constructs in the Azure hierarchy

**3. Answer: d) Standard**

- **Correct:** Your notes specify "Standard" supports Blob Storage, Queue storage, Table Storage and Azure Files.
- **Why others are wrong:**
  - a, b, c) These Premium account types have more limited service support

**4. Answer: c) Premium Block Blob**

- **Correct:** Your notes state "Premium Block Blob" only supports Blob Storage.
- **Why others are wrong:**
  - a) Standard supports multiple storage types
  - b, d) These Premium types support different services

**5. Answer: b) Hot**

- **Correct:** Your notes state Hot tier "is optimized for frequent access of objects" and "has the highest storage costs, but the lowest access costs."
- **Why others are wrong:**
  - a, c, d) These tiers are optimized for less frequent access

**6. Answer: b) Cool**

- **Correct:** Your notes state Cool tier "is optimized for storing large amounts of data that is infrequently accessed and stored for a minimum of 30 days."
- **Why others are wrong:**
  - a) Hot is for frequent access
  - c) Cold requires minimum 90 days
  - d) Archive requires minimum 180 days

**7. Answer: c) Cold**

- **Correct:** Your notes state Cold tier "is optimized for storing data that is infrequently accessed and stored for a minimum of 90 days."
- **Why others are wrong:**
  - a) Hot is for frequent access
  - b) Cool requires minimum 30 days
  - d) Archive requires minimum 180 days

**8. Answer: d) Archive**

- **Correct:** Your notes state Archive tier "is available only for individual block blobs and is optimized for data that can tolerate several hours of retrieval latency."
- **Why others are wrong:**
  - a, b, c) These are online tiers with immediate access

**9. Answer: b) Block Blobs**

- **Correct:** Your notes state "Block Blobs" are "made up of blocks of data that can be managed individually and can store up to about 190.7 TiB."
- **Why others are wrong:**
  - a) Page blobs are for VHD files
  - c) Append blobs are for logging scenarios
  - d) Not a valid blob type

**10. Answer: c) Append Blobs**

- **Correct:** Your notes state "Append Blobs" are "ideal for scenarios such as logging data from virtual machines."
- **Why others are wrong:**
  - a, b) These blob types are not optimized for logging scenarios
  - d) Not a valid blob type

**11. Answer: c) Page Blobs**

- **Correct:** Your notes state "Page blobs" can "store random access Virtual Hard Drive (VHD) files up to 8 TB."
- **Why others are wrong:**
  - a, b) These blob types are not designed for VHD files
  - d) Not a valid blob type

**12. Answer: b) Version 2**

- **Correct:** Your notes state "Version 2" uses "Galois/Counter Mode (GCM) mode with AES."
- **Why others are wrong:**
  - a) Version 1 uses CBC mode
  - c, d) These versions don't exist in your notes

**13. Answer: c) Account level**

- **Correct:** Your notes state "Data storage limits are set at the account level and not per access tier."
- **Why others are wrong:**
  - a, b, d) These are not the levels where storage limits are set

**14. Answer: b) An array in JSON format containing between 1 and 100 defined rules**

- **Correct:** Your notes define lifecycle management policy exactly this way.
- **Why others are wrong:**
  - a, c, d) These don't match the format and structure described

**15. Answer: c) Two items: Filter set and Action set**

- **Correct:** Your notes state "each lifecycle management policy rule must include" a "Filter set" and "Action set."
- **Why others are wrong:**
  - a, b, d) These don't include both required components

**16. Answer: b) AND**

- **Correct:** Your notes state "If more than one filter is defined in a lifecycle management rule, a logical AND is used for evaluation."
- **Why others are wrong:**
  - a, c, d) Your notes specifically state AND, not these other operators

**17. Answer: b) The least expensive action**

- **Correct:** Your notes state "lifecycle management applies the least expensive action to the blob."
- **Why others are wrong:**
  - a, c, d) These don't match the behavior described in your notes

**18. Answer: a) Azure Portal List View, Azure Portal Code View, Azure CLI**

- **Correct:** Your notes list these three specific ways to add a blob-storage policy.
- **Why others are wrong:**
  - b, c, d) These don't match the specific methods mentioned in your notes

**19. Answer: b) Rehydrate the blob to an online tier**

- **Correct:** Your notes state "you must first rehydrate the blob to an online tier, either the hot or cool tier."
- **Why others are wrong:**
  - a, c, d) These actions won't make archived data accessible

**20. Answer: b) Standard Priority**

- **Correct:** Your notes state "Standard priority" rehydration "might take up to 15 hours."
- **Why others are wrong:**
  - a) High Priority is faster (under 1 hour)
  - c, d) These priorities aren't mentioned in your notes

**21. Answer: b) High Priority**

- **Correct:** Your notes state "High Priority" rehydration "might complete in under one hour for objects under 10 GB in size."
- **Why others are wrong:**
  - a) Standard priority takes up to 15 hours
  - c, d) These priorities aren't mentioned in your notes

**22. Answer: b) Set Blob Tier**

- **Correct:** Your notes state "Set Blob Tier" is the operation "used to change a blobs access tier for rehydration from Archive."
- **Why others are wrong:**
  - a) Copy Blob creates a new blob
  - c, d) These operations don't exist for tier changes

**23. Answer: c) General Purpose v2**

- **Correct:** Your notes state "General Purpose v2" storage account type supports lifecycle policies.
- **Why others are wrong:**
  - a, b, d) These account types don't support lifecycle policies according to your notes

**24. Answer: c) Five**

- **Correct:** Your notes list five classes: "BlobClient, BlobClientOptions, BlobContainerClient, BlobServiceClient, BlobUriBuilder."
- **Why others are wrong:**
  - a, b, d) These don't match the actual count of classes listed

**25. Answer: c) To interact with resources at the storage account level**

- **Correct:** Your notes state "BlobServiceClient object allows your app to interact with resources at the storage account level."
- **Why others are wrong:**
  - a, b, d) These describe more specific or limited functionality

**26. Answer: a) Yes, it's possible**

- **Correct:** Your notes state "You can choose to use a BlobContainerClient object directly without using a BlobServiceClient."
- **Why others are wrong:**
  - b, c, d) Your notes explicitly state it's possible to use BlobContainerClient directly

**27. Answer: b) 8KB**

- **Correct:** Your notes state "8KB" is the size limit for all metadata key/value pairs for a Blob Container.
- **Why others are wrong:**
  - a, c, d) These don't match the specific limit mentioned

**28. Answer: c) All existing metadata on the resource is cleared**

- **Correct:** Your notes state "Calling PUT without any headers on the request clears all existing metadata on the resource."
- **Why others are wrong:**
  - a, b, d) These don't match the behavior described

**29. Answer: b) x-ms-meta-**

- **Correct:** Your notes state "Metadata headers are named with the header prefix x-ms-meta- and a custom name."
- **Why others are wrong:**
  - a, c, d) These are not the correct metadata header prefix

**30. Answer: c) BlobContainerClient**

- **Correct:** Your notes indicate BlobContainerClient can manipulate both containers and blobs within them.
- **Why others are wrong:**
  - a) BlobClient works with individual blobs only
  - b) BlobServiceClient works at the account level
  - d) BlobUriBuilder is for URI construction
