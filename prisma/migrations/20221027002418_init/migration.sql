-- CreateTable
CREATE TABLE "ItinerariesRate" (
    "id" STRING NOT NULL,
    "media" INT4 NOT NULL,
    "quantity" INT4 NOT NULL,
    "itinerariesId" STRING NOT NULL,

    CONSTRAINT "ItinerariesRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItinerariesSimple" (
    "id" STRING NOT NULL,
    "summary" STRING,
    "itinerariesId" STRING NOT NULL,

    CONSTRAINT "ItinerariesSimple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItinerariesSimpleCitiesCoordinates" (
    "id" STRING NOT NULL,
    "latitude" JSONB NOT NULL,
    "longitude" JSONB NOT NULL,
    "itinerariesSimpleCitiesId" STRING NOT NULL,

    CONSTRAINT "ItinerariesSimpleCitiesCoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItinerariesSimpleCitiesAccommodations" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "rate" INT4 NOT NULL,
    "itinerariesSimpleCitiesId" STRING NOT NULL,

    CONSTRAINT "ItinerariesSimpleCitiesAccommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItinerariesSimpleCities" (
    "id" STRING NOT NULL,
    "description" STRING NOT NULL,
    "images" STRING[],
    "name" STRING NOT NULL,
    "rate" INT4 NOT NULL,
    "itinerariesSimpleId" STRING NOT NULL,

    CONSTRAINT "ItinerariesSimpleCities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersPictures" (
    "id" STRING NOT NULL,
    "cover" STRING NOT NULL,
    "profile" STRING NOT NULL,
    "userProfileId" STRING NOT NULL,

    CONSTRAINT "UsersPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSocial" (
    "id" STRING NOT NULL,
    "facebook" STRING NOT NULL,
    "instagram" STRING NOT NULL,
    "userProfileId" STRING NOT NULL,

    CONSTRAINT "UsersSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itineraries" (
    "id" STRING NOT NULL,
    "__v" INT4 NOT NULL,
    "author" STRING NOT NULL,
    "cover" STRING,
    "createdAt" DATE NOT NULL,
    "days" INT4 NOT NULL,
    "interests" STRING[],
    "made" BOOL NOT NULL,
    "spent" STRING NOT NULL,
    "title" STRING NOT NULL,
    "tripDate" STRING NOT NULL,
    "model" STRING NOT NULL,
    "userProfileId" STRING NOT NULL,

    CONSTRAINT "Itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmaps" (
    "id" STRING NOT NULL,

    CONSTRAINT "Roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItinerariesOnRoadmaps" (
    "id" STRING NOT NULL,
    "itinerariesId" STRING NOT NULL,
    "roadmapsId" STRING NOT NULL,

    CONSTRAINT "ItinerariesOnRoadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapComment" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "roadmapId" STRING NOT NULL,
    "userProfileId" STRING NOT NULL,

    CONSTRAINT "RoadmapComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "model" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "password" STRING,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Follows" (
    "id" STRING NOT NULL,
    "followerId" STRING NOT NULL,
    "followeeId" STRING NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" STRING NOT NULL,
    "firstname" STRING,
    "lastname" STRING,
    "gender" STRING,
    "about" STRING,
    "birthdate" STRING,
    "confirmPolicy" BOOL NOT NULL DEFAULT false,
    "country" STRING,
    "ranking" STRING,
    "interests" STRING[],
    "uniqueIdentifier" STRING,
    "favorites" JSONB,
    "userId" STRING NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItinerariesRate_itinerariesId_key" ON "ItinerariesRate"("itinerariesId");

-- CreateIndex
CREATE UNIQUE INDEX "ItinerariesSimple_itinerariesId_key" ON "ItinerariesSimple"("itinerariesId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersPictures_userProfileId_key" ON "UsersPictures"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersSocial_userProfileId_key" ON "UsersSocial"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_uniqueIdentifier_key" ON "UserProfile"("uniqueIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "ItinerariesRate" ADD CONSTRAINT "ItinerariesRate_itinerariesId_fkey" FOREIGN KEY ("itinerariesId") REFERENCES "Itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItinerariesSimple" ADD CONSTRAINT "ItinerariesSimple_itinerariesId_fkey" FOREIGN KEY ("itinerariesId") REFERENCES "Itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItinerariesSimpleCitiesCoordinates" ADD CONSTRAINT "ItinerariesSimpleCitiesCoordinates_itinerariesSimpleCities_fkey" FOREIGN KEY ("itinerariesSimpleCitiesId") REFERENCES "ItinerariesSimpleCities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItinerariesSimpleCitiesAccommodations" ADD CONSTRAINT "ItinerariesSimpleCitiesAccommodations_itinerariesSimpleCit_fkey" FOREIGN KEY ("itinerariesSimpleCitiesId") REFERENCES "ItinerariesSimpleCities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItinerariesSimpleCities" ADD CONSTRAINT "ItinerariesSimpleCities_itinerariesSimpleId_fkey" FOREIGN KEY ("itinerariesSimpleId") REFERENCES "ItinerariesSimple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersPictures" ADD CONSTRAINT "UsersPictures_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSocial" ADD CONSTRAINT "UsersSocial_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItinerariesOnRoadmaps" ADD CONSTRAINT "ItinerariesOnRoadmaps_itinerariesId_fkey" FOREIGN KEY ("itinerariesId") REFERENCES "Itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItinerariesOnRoadmaps" ADD CONSTRAINT "ItinerariesOnRoadmaps_roadmapsId_fkey" FOREIGN KEY ("roadmapsId") REFERENCES "Roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapComment" ADD CONSTRAINT "RoadmapComment_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapComment" ADD CONSTRAINT "RoadmapComment_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
