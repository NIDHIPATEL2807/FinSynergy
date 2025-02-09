import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

const Learning = ({ wallet, setWallet }) => {
  const [user] = useAuthState(auth);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [activeContest, setActiveContest] = useState(null);
  const [weeklyChallenge, setWeeklyChallenge] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [contestDetails, setContestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get user's display name
  const getUserDisplayName = (userData) => {
    // First try to get the displayName from userData
    if (userData.displayName && userData.displayName !== userData.email) {
      return userData.displayName;
    }
    // If no displayName, get the part before @ in email
    if (userData.email) {
      return userData.email.split('@')[0];
    }
    return 'Anonymous User';
  };

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('portfolio', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const leaderboardData = [];
      let rank = 1;
      let foundCurrentUser = false;
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email || userData.displayName) {
          if (doc.id === user.uid) {
            foundCurrentUser = true;
          }
          leaderboardData.push({
            id: doc.id,
            rank,
            name: getUserDisplayName(userData),
            portfolio: userData.portfolio || 10000,
            returns: userData.returns || '+0.0%',
            trades: userData.trades || 0
          });
          rank++;
        }
      });

      // If current user is not found, add them at the end
      if (!foundCurrentUser) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          leaderboardData.push({
            id: user.uid,
            rank: leaderboardData.length + 1,
            name: getUserDisplayName(userData),
            portfolio: userData.portfolio || 10000,
            returns: userData.returns || '+0.0%',
            trades: userData.trades || 0
          });
        }
      }
      
      console.log("Fetched leaderboard data:", leaderboardData);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to fetch leaderboard");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize user data when they first log in
  useEffect(() => {
    const initializeUserData = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (!userDoc.exists()) {
            // Initialize new user data with display name
            await setDoc(userRef, {
              displayName: user.displayName || user.email.split('@')[0], // Use name part of email if no display name
              email: user.email,
              portfolio: 10000,
              returns: '+0.0%',
              trades: 0,
              createdAt: new Date()
            });
            console.log("Created new user data");
            fetchLeaderboard();
          }
        } catch (error) {
          console.error("Error initializing user data:", error);
          toast.error("Failed to initialize user data");
        }
      }
    };

    initializeUserData();
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchLeaderboard();
      // Set up real-time updates or polling if needed
      const interval = setInterval(fetchLeaderboard, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  // Fetch user's progress from Firebase
  const fetchUserProgress = async () => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      setCompletedLessons(data.completedLessons || []);
      setUserPoints(data.points || 0);
      setUserProgress(data.lessonProgress || {});
    }
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to Stock Market",
      content: "Learn the basics of how stock markets work...",
      points: 50,
      quiz: [
        {
          question: "What is a stock?",
          options: [
            "A type of bond",
            "Ownership in a company",
            "A savings account",
            "A loan"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Technical Analysis Basics",
      content: "Understanding charts and technical indicators...",
      points: 75,
      quiz: [
        {
          question: "What is a candlestick chart?",
          options: [
            "A type of lamp",
            "A price visualization tool",
            "A company valuation method",
            "A trading strategy"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Risk Management",
      content: "Learn about stop losses and position sizing...",
      points: 100,
      quiz: [
        {
          question: "What is a stop-loss order?",
          options: [
            "An order to buy stocks",
            "An order to limit potential losses",
            "A profit target",
            "A market analysis tool"
          ],
          correct: 1
        }
      ]
    }
  ];

  const tradingContests = [
    {
      id: 1,
      title: "Beginner's Trading Contest",
      duration: "3 days",
      startingCapital: 10000,
      prizes: {
        first: 500,
        second: 300,
        third: 200
      },
      rules: "Trade with virtual money, highest return wins",
      startDate: "2024-04-01",
      endDate: "2024-04-03",
      minTrades: 5,
      maxLeverage: 2,
      participants: 45,
      status: "ongoing"
    },
    {
      id: 2,
      title: "Pro Trader Challenge",
      duration: "1 week",
      startingCapital: 50000,
      prizes: {
        first: 1000,
        second: 500,
        third: 300
      },
      rules: "Advanced trading competition with risk management rules"
    }
  ];

  const weeklyChallenges = [
    {
      id: 1,
      title: "Perfect Timing Challenge",
      description: "Make 5 profitable trades in a row",
      points: 200,
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Risk Manager",
      description: "Complete 10 trades without exceeding 2% loss per trade",
      points: 300,
      difficulty: "Hard"
    }
  ];

  const updateLessonProgress = async (lessonId, progress) => {
    if (!user) return;

    // Update local state immediately for better UX
    const newProgress = {
      ...userProgress,
      [lessonId]: {
        progress: Math.min(progress, 100),
        lastUpdated: new Date().toISOString()
      }
    };
    setUserProgress(newProgress);

    try {
      // Then update Firebase
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        lessonProgress: newProgress
      }, { merge: true });
    } catch (error) {
      // Revert local state if Firebase update fails
      setUserProgress(userProgress);
      toast.error("Failed to update progress");
    }
  };

  const startLesson = async (lessonId) => {
    // Update local state immediately
    setUserProgress(prev => ({
      ...prev,
      [lessonId]: {
        progress: 0,
        lastUpdated: new Date().toISOString()
      }
    }));

    try {
      // Then update Firebase
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        lessonProgress: {
          ...userProgress,
          [lessonId]: {
            progress: 0,
            lastUpdated: new Date().toISOString()
          }
        }
      }, { merge: true });
    } catch (error) {
      // Revert on error
      setUserProgress(userProgress);
      toast.error("Failed to start lesson");
    }
  };

  const handleLessonAction = async (lessonId, currentProgress) => {
    try {
      if (currentProgress === 0) {
        await startLesson(lessonId);
        // Immediately start progress after initialization
        await updateLessonProgress(lessonId, 25);
        toast.success("Lesson started!");
      } else if (currentProgress >= 90) {
        await completeLesson(lessonId);
      } else {
        await updateLessonProgress(lessonId, currentProgress + 25);
        
        // Add small coin reward for progress
        const progressCoins = 5; // Small reward for progress
        setWallet(prev => prev + progressCoins);
        
        // Update wallet in Firebase
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          wallet: wallet + progressCoins
        }, { merge: true });
        
        toast.success(`Progress saved! Earned ${progressCoins} coins!`);
      }
    } catch (error) {
      toast.error("Failed to update progress. Please try again.");
    }
  };

  const completeLesson = async (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const lesson = lessons.find(l => l.id === lessonId);
      const pointsEarned = lesson.points;
      const coinsEarned = pointsEarned; // Convert points to coins 1:1
      
      try {
        // Update progress to 100%
        await updateLessonProgress(lessonId, 100);
        
        // Update local state
        setUserPoints(prev => prev + pointsEarned);
        setCompletedLessons(prev => [...prev, lessonId]);
        setWallet(prev => prev + coinsEarned); // Update wallet immediately for better UX

        // Update Firebase with all changes
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          points: userPoints + pointsEarned,
          completedLessons: [...completedLessons, lessonId],
          wallet: wallet + coinsEarned
        }, { merge: true });

        toast.success(`Congratulations! You earned ${pointsEarned} points and ${coinsEarned} coins!`);
        fetchLeaderboard();
      } catch (error) {
        // Rollback local state changes if Firebase update fails
        setUserPoints(prev => prev - pointsEarned);
        setCompletedLessons(prev => prev.filter(id => id !== lessonId));
        setWallet(prev => prev - coinsEarned);
        toast.error("Failed to complete lesson. Please try again.");
      }
    }
  };

  const joinContest = (contestId) => {
    setActiveContest(contestId);
    alert("You've joined the trading contest! Good luck!");
  };

  const acceptWeeklyChallenge = (challengeId) => {
    setWeeklyChallenge(challengeId);
    setUserProgress(prev => ({
      ...prev,
      [challengeId]: {
        started: new Date(),
        progress: 0
      }
    }));
  };

  // Calculate lesson progress
  const calculateProgress = (lessonId) => {
    return userProgress[lessonId]?.progress || 0;
  };

  // Update the lesson card to include progress tracking
  const LessonCard = ({ lesson }) => {
    const progress = calculateProgress(lesson.id);
    const isCompleted = completedLessons.includes(lesson.id);

    return (
      

      <div className="bg-white p-6 rounded-lg shadow-lg">
  <h4 className="text-xl font-semibold mb-2 text-teal-950">{lesson.title}</h4>
  <p className="text-stone-800 mb-4">{lesson.content}</p>
  
  {/* Progress Bar */}
  <div className="mb-4">
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full transition-all duration-300 ${
          isCompleted ? 'bg-teal-700' : 'bg-teal-600'
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="flex justify-between text-sm text-gray-600 mt-1">
      <span>Progress: {progress}%</span>
      {isCompleted && <span className="text-teal-700">Completed!</span>}
    </div>
  </div>

  <div className="flex justify-between items-center">
    <div className="flex flex-col">
      <span className="text-teal-600">{lesson.points} points</span>
      <span className="text-sm text-stone-500">
        {progress < 100 ? `+5 coins per progress` : 'Completed'}
      </span>
    </div>
    {!isCompleted ? (
      <button
        onClick={() => handleLessonAction(lesson.id, progress)}
        className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white"
      >
        {progress === 0 ? 'Start Lesson' : progress >= 90 ? 'Complete Lesson' : 'Continue'}
      </button>
    ) : (
      <button
        disabled
        className="px-4 py-2 rounded bg-gray-300 text-gray-600 cursor-not-allowed"
      >
        Completed
      </button>
    )}
  </div>
</div>

    );
  };

  return (
   

    <div className="p-6 max-w-6xl mx-auto">
  {/* Points and Progress Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <div className="bg-teal-100 p-4 rounded-lg">
      <p className="text-lg text-teal-950">Your Points: {userPoints}</p>
    </div>
    <div className="bg-lime-100 p-4 rounded-lg">
      <p className="text-lg text-teal-950">Completed Lessons: {completedLessons.length}/{lessons.length}</p>
    </div>
  </div>

  {/* Trading Contest Leaderboard Section */}
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-white mb-4">Trading Contest Leaderboard</h3>
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
      {isLoading ? (
        <div className="text-center py-4 text-teal-950">Loading leaderboard...</div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center py-4 text-teal-950">
          <p>No participants yet</p>
          <p className="text-sm text-gray-600 mt-2">
            Current user: {getUserDisplayName({ email: user?.email, displayName: user?.displayName })}
          </p>
        </div>
      ) : (
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b-2">
              <th className="p-2 text-left text-teal-950">Rank</th>
              <th className="p-2 text-left text-teal-950">Trader</th>
              <th className="p-2 text-right text-teal-950">Portfolio Value</th>
              <th className="p-2 text-right text-teal-950">Returns</th>
              <th className="p-2 text-right text-teal-950">Total Trades</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((trader) => (
              <tr
                key={trader.id}
                className={`border-b hover:bg-teal-50 ${
                  trader.id === user?.uid ? 'bg-teal-100' : ''
                }`}
              >
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    {trader.rank <= 3 && (
                      <span
                        className={`${
                          trader.rank === 1 ? 'text-yellow-500' : ''
                        } ${trader.rank === 2 ? 'text-gray-400' : ''} ${
                          trader.rank === 3 ? 'text-amber-600' : ''
                        } text-xl`}
                      >
                        {trader.rank === 1 ? '👑' : trader.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    )}
                    #{trader.rank}
                  </div>
                </td>
                <td className="p-2 font-medium text-teal-950">{trader.name}</td>
                <td className="p-2 text-right text-teal-950">
                  ${trader.portfolio.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td
                  className={`p-2 text-right ${
                    parseFloat(trader.returns) > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trader.returns}
                </td>
                <td className="p-2 text-right text-teal-950">{trader.trades}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    <div className="mt-4 bg-teal-50 p-4 rounded-lg">
      <p className="text-sm text-teal-800">
        🏆 Contest ends in: <span className="font-semibold">2 days 14 hours</span> | Prize Pool: <span className="font-semibold">$5,000</span>
      </p>
    </div>
  </div>

  {/* Learning Lessons */}
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-white mb-4">Trading Lessons</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  </div>

  {/* Trading Contests */}
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-white mb-4">Trading Contests</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tradingContests.map((contest) => (
        <div key={contest.id} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xl font-semibold text-teal-950">{contest.title}</h4>
            <span
              className={`px-2 py-1 rounded text-sm ${
                contest.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {contest.status}
            </span>
          </div>
          <p className="text-gray-600 mb-2">Duration: {contest.duration}</p>
          <p className="text-gray-600 mb-2">Starting Capital: ${contest.startingCapital}</p>
          <p className="text-gray-600 mb-2">Participants: {contest.participants}</p>
          <div className="mb-4">
            <p className="font-medium text-teal-950">Contest Rules:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Minimum trades: {contest.minTrades}</li>
              <li>Maximum leverage: {contest.maxLeverage}x</li>
              <li>{contest.rules}</li>
            </ul>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold text-teal-950">Prizes:</h5>
            <p>1st Place: {contest.prizes.first} points</p>
            <p>2nd Place: {contest.prizes.second} points</p>
            <p>3rd Place: {contest.prizes.third} points</p>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>Start Date: {contest.startDate}</p>
            <p>End Date: {contest.endDate}</p>
          </div>
          <button
            onClick={() => joinContest(contest.id)}
            className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Join Contest
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Weekly Challenges */}
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-white mb-4">Weekly Challenges</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {weeklyChallenges.map((challenge) => (
        <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xl font-semibold text-teal-950">{challenge.title}</h4>
            <span
              className={`px-2 py-1 rounded text-sm ${
                challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {challenge.difficulty}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{challenge.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-teal-500">{challenge.points} points</span>
            <button
              onClick={() => acceptWeeklyChallenge(challenge.id)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Accept Challenge
            </button>
          </div>
          {userProgress[challenge.id] && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-orange-600 h-2.5 rounded-full"
                  style={{ width: `${userProgress[challenge.id].progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Learning;
