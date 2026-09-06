import { Play, Trophy, Star, Clock, CheckCircle, XCircle, RotateCcw, Code, Brain, Gamepad2, Target, Award, Zap } from 'lucide-react'

const Quizdata = [
  {
    id: 'ai-tools',
    title: 'AI Tools & Technologies',
    description: 'Test your knowledge of AI tools, frameworks, and platforms',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "Which company developed TensorFlow?",
        options: ["Microsoft", "Google", "Facebook", "Amazon"],
        correctAnswer: 1,
        explanation: "TensorFlow was developed by the Google Brain Team.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which of these is primarily used for deep learning?",
        options: ["Scikit-learn", "Keras", "Matplotlib", "Pandas"],
        correctAnswer: 1,
        explanation: "Keras is a high-level deep learning library running on top of TensorFlow.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "PyTorch was originally developed by which organization?",
        options: ["Google", "Facebook AI Research", "Microsoft Research", "OpenAI"],
        correctAnswer: 1,
        explanation: "PyTorch was developed by Facebook AI Research (FAIR).",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 4,
        question: "Which tool is commonly used for managing machine learning experiments?",
        options: ["GitHub", "MLflow", "Docker", "Jenkins"],
        correctAnswer: 1,
        explanation: "MLflow is widely used for tracking experiments, models, and results.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 5,
        question: "Which cloud platform offers SageMaker for ML?",
        options: ["Google Cloud", "AWS", "Azure", "IBM Cloud"],
        correctAnswer: 1,
        explanation: "Amazon Web Services (AWS) provides SageMaker for machine learning.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    description: 'Quiz on reinforcement learning fundamentals and applications',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "What is the key idea of reinforcement learning?",
        options: ["Learning from labeled data", "Learning by trial and error", "Learning from clustering", "Learning from optimization"],
        correctAnswer: 1,
        explanation: "Reinforcement learning is based on trial-and-error interactions with an environment.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "In RL, the agent interacts with?",
        options: ["A dataset", "A neural network", "An environment", "A database"],
        correctAnswer: 2,
        explanation: "The agent learns by interacting with an environment.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which term represents the immediate feedback the agent receives?",
        options: ["Reward", "Policy", "Action", "State"],
        correctAnswer: 0,
        explanation: "The reward is the immediate feedback after an action in RL.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 4,
        question: "Q-learning is an example of?",
        options: ["Model-free RL", "Model-based RL", "Supervised learning", "Unsupervised learning"],
        correctAnswer: 0,
        explanation: "Q-learning is a model-free reinforcement learning algorithm.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 5,
        question: "What does the policy in RL define?",
        options: ["How states are represented", "The best sequence of actions", "The learning rate", "The exploration rate"],
        correctAnswer: 1,
        explanation: "A policy defines the mapping from states to actions.",
        difficulty: 'Medium',
        points: 10
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science for AI/ML',
    description: 'Test your knowledge of data science concepts used in AI/ML',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "What is the first step in a typical data science workflow?",
        options: ["Data Cleaning", "Data Collection", "Model Training", "Model Evaluation"],
        correctAnswer: 1,
        explanation: "Data collection is the first step before any analysis or modeling can be done.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which library is commonly used for data manipulation in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
        correctAnswer: 1,
        explanation: "Pandas is widely used for data manipulation and analysis.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which technique is used to reduce dimensionality of data?",
        options: ["Regression", "Classification", "PCA", "Clustering"],
        correctAnswer: 2,
        explanation: "Principal Component Analysis (PCA) is a dimensionality reduction technique.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 4,
        question: "Which metric is best for evaluating classification performance?",
        options: ["Mean Squared Error", "Accuracy", "R² Score", "Euclidean Distance"],
        correctAnswer: 1,
        explanation: "Accuracy is one of the most common metrics for classification tasks.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "Handling missing values is part of?",
        options: ["Data Cleaning", "Model Training", "Feature Engineering", "Visualization"],
        correctAnswer: 0,
        explanation: "Dealing with missing values is an important data cleaning step.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'ai-applications',
    title: 'AI in Real-World Applications',
    description: 'Quiz on practical applications of AI across industries',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "Which AI application is used in email spam filtering?",
        options: ["Reinforcement Learning", "Supervised Learning", "Clustering", "Deep Learning"],
        correctAnswer: 1,
        explanation: "Spam filters are often built using supervised learning algorithms.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which AI technique is most commonly used in self-driving cars?",
        options: ["Computer Vision", "Recommendation Systems", "Chatbots", "Genetic Algorithms"],
        correctAnswer: 0,
        explanation: "Self-driving cars rely heavily on computer vision to understand surroundings.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 3,
        question: "Which industry uses AI for fraud detection?",
        options: ["Healthcare", "Finance", "Education", "Agriculture"],
        correctAnswer: 1,
        explanation: "Financial institutions use AI models to detect fraudulent transactions.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 4,
        question: "Which AI technology powers virtual assistants like Alexa and Siri?",
        options: ["Natural Language Processing", "Clustering", "Robotics", "Regression"],
        correctAnswer: 0,
        explanation: "Virtual assistants rely on NLP to understand and respond to human speech.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "In healthcare, AI is used for?",
        options: ["Predicting diseases", "Crop yield optimization", "Traffic signal control", "E-commerce recommendations"],
        correctAnswer: 0,
        explanation: "AI helps in disease prediction and medical diagnosis.",
        difficulty: 'Medium',
        points: 10
      }
    ]
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & LLMs',
    description: 'Test your understanding of generative AI models and large language models',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "What does LLM stand for?",
        options: ["Large Learning Model", "Large Language Model", "Long Learning Machine", "Language Logic Model"],
        correctAnswer: 1,
        explanation: "LLM stands for Large Language Model.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which of the following is an example of a generative AI model?",
        options: ["GPT-4", "ResNet", "Decision Tree", "Random Forest"],
        correctAnswer: 0,
        explanation: "GPT-4 is a generative AI model capable of producing human-like text.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which technique is commonly used in generative AI?",
        options: ["Reinforcement Learning", "GANs", "Clustering", "SVM"],
        correctAnswer: 1,
        explanation: "Generative Adversarial Networks (GANs) are widely used in generative AI.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 4,
        question: "ChatGPT is based on which architecture?",
        options: ["CNN", "RNN", "Transformer", "GAN"],
        correctAnswer: 2,
        explanation: "ChatGPT is built on the Transformer architecture.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "Which company created ChatGPT?",
        options: ["Google", "OpenAI", "Meta", "Microsoft"],
        correctAnswer: 1,
        explanation: "ChatGPT was developed by OpenAI.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'ai-math',
    title: 'AI Math & Statistics Essentials',
    description: 'Test your understanding of mathematical foundations for AI',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "Which branch of math is most important for deep learning?",
        options: ["Linear Algebra", "Trigonometry", "Number Theory", "Topology"],
        correctAnswer: 0,
        explanation: "Linear algebra is the backbone of neural networks and deep learning.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "The sigmoid function outputs values between?",
        options: ["0 and 1", "-1 and 1", "-∞ and ∞", "0 and ∞"],
        correctAnswer: 0,
        explanation: "Sigmoid maps input values to a range between 0 and 1.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which theorem is fundamental in probability for AI models?",
        options: ["Pythagoras Theorem", "Bayes' Theorem", "Central Limit Theorem", "Law of Large Numbers"],
        correctAnswer: 1,
        explanation: "Bayes' theorem is widely used in probabilistic AI models.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 4,
        question: "Gradient Descent is primarily used for?",
        options: ["Optimization", "Classification", "Visualization", "Clustering"],
        correctAnswer: 0,
        explanation: "Gradient descent is used to minimize loss functions in machine learning.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 5,
        question: "Variance in statistics measures?",
        options: ["The spread of data", "The central tendency", "The correlation", "The probability distribution"],
        correctAnswer: 0,
        explanation: "Variance measures how far values spread out from the mean.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'ai-history-future',
    title: 'AI History & Future Trends',
    description: 'Quiz on the evolution of AI and its future directions',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 60,
    timeLimit: 10,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "Who is considered the father of AI?",
        options: ["Alan Turing", "John McCarthy", "Geoffrey Hinton", "Marvin Minsky"],
        correctAnswer: 1,
        explanation: "John McCarthy coined the term Artificial Intelligence and is considered the father of AI.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "In which decade did AI research begin?",
        options: ["1940s", "1950s", "1960s", "1970s"],
        correctAnswer: 1,
        explanation: "AI research formally began in the 1950s.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which event caused the first 'AI Winter'?",
        options: ["Lack of funding", "Overhype and underperformance", "Rise of the internet", "Emergence of deep learning"],
        correctAnswer: 1,
        explanation: "Overhype and lack of progress led to reduced funding, causing the AI Winter.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 4,
        question: "Which breakthrough revived AI research in the 2010s?",
        options: ["Expert systems", "Symbolic AI", "Deep learning", "Genetic algorithms"],
        correctAnswer: 2,
        explanation: "Deep learning breakthroughs in the 2010s reignited AI research.",
        difficulty: 'Medium',
        points: 10
      },
      {
        id: 5,
        question: "Which of these is seen as a future trend in AI?",
        options: ["Explainable AI", "Typewriters", "Punch cards", "Vacuum tubes"],
        correctAnswer: 0,
        explanation: "Explainable AI (XAI) is a major research trend for the future.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'ai-ml-basics',
    title: 'AI/ML Fundamentals',
    description: 'Test your knowledge of artificial intelligence and machine learning basics',
    category: 'AI/ML',
    difficulty: 'Easy',
    totalPoints: 150,
    timeLimit: 15,
    icon: 'Brain',
    questions: [
      {
        id: 1,
        question: "What does 'AI' stand for?",
        options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Adaptive Intelligence"],
        correctAnswer: 0,
        explanation: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which of the following is a supervised learning algorithm?",
        options: ["K-means clustering", "Linear Regression", "PCA", "DBSCAN"],
        correctAnswer: 1,
        explanation: "Linear Regression is a supervised learning algorithm used for predicting continuous values.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 3,
        question: "What is the primary goal of deep learning?",
        options: ["Data visualization", "Pattern recognition", "Data storage", "Web development"],
        correctAnswer: 1,
        explanation: "Deep learning aims to automatically learn and extract patterns from data using neural networks.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 4,
        question: "Which Python library is most commonly used for machine learning?",
        options: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
        correctAnswer: 2,
        explanation: "Scikit-learn is the most popular Python library specifically designed for machine learning.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "What is overfitting in machine learning?",
        options: [
          "When a model performs well on both training and test data",
          "When a model performs well on training data but poorly on test data",
          "When a model performs poorly on both training and test data",
          "When a model takes too long to train"
        ],
        correctAnswer: 1,
        explanation: "Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on new data.",
        difficulty: 'Hard',
        points: 25
      },
      {
        id: 6,
        question: "What is the main difference between AI and Machine Learning?",
        options: [
          "AI and ML are the same thing",
          "AI is a subset of ML",
          "ML is a subset of AI",
          "They are completely unrelated"
        ],
        correctAnswer: 2,
        explanation: "Machine Learning is a subset of Artificial Intelligence that focuses on algorithms that can learn from data.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 7,
        question: "Which activation function is most commonly used in hidden layers of deep neural networks?",
        options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
        correctAnswer: 2,
        explanation: "ReLU (Rectified Linear Unit) is widely used because it helps avoid the vanishing gradient problem and is computationally efficient.",
        difficulty: 'Hard',
        points: 20
      },
      {
        id: 8,
        question: "What does 'GPU' acceleration primarily help with in AI/ML?",
        options: [
          "Data storage",
          "Parallel computation for matrix operations",
          "Network connectivity",
          "Memory management"
        ],
        correctAnswer: 1,
        explanation: "GPUs excel at parallel processing, making them ideal for the matrix operations common in neural network training.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 9,
        question: "What is the purpose of the validation set in machine learning?",
        options: [
          "To train the model",
          "To test the final model performance",
          "To tune hyperparameters and prevent overfitting",
          "To store backup data"
        ],
        correctAnswer: 2,
        explanation: "The validation set is used to tune hyperparameters and select the best model while avoiding overfitting to the test set.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 10,
        question: "Which technique is used to handle the 'vanishing gradient problem' in deep networks?",
        options: [
          "Batch Normalization",
          "Dropout",
          "Data Augmentation",
          "Feature Scaling"
        ],
        correctAnswer: 0,
        explanation: "Batch Normalization helps stabilize training and mitigate the vanishing gradient problem by normalizing inputs to each layer.",
        difficulty: 'Hard',
        points: 25
      }
    ]
  },
  {
    id: 'fun-tech',
    title: 'Tech Trivia Challenge',
    description: 'Fun technology and programming trivia questions',
    category: 'Fun',
    difficulty: 'Medium',
    totalPoints: 80,
    timeLimit: 10,
    icon: 'Gamepad2',
    questions: [
      {
        id: 1,
        question: "Who is known as the father of computer science?",
        options: ["Bill Gates", "Steve Jobs", "Alan Turing", "Tim Berners-Lee"],
        correctAnswer: 2,
        explanation: "Alan Turing is widely considered the father of computer science and artificial intelligence.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 2,
        question: "What does 'HTTP' stand for?",
        options: ["HyperText Transfer Protocol", "HyperText Translation Protocol", "High Tech Transfer Protocol", "Home Tool Transfer Protocol"],
        correctAnswer: 0,
        explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which company created the programming language 'Go'?",
        options: ["Microsoft", "Apple", "Google", "Facebook"],
        correctAnswer: 2,
        explanation: "Go (also known as Golang) was created by Google in 2009.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 4,
        question: "What year was the first iPhone released?",
        options: ["2006", "2007", "2008", "2009"],
        correctAnswer: 1,
        explanation: "The first iPhone was released by Apple in June 2007.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 2,
        explanation: "JavaScript is often called the 'language of the web' as it's essential for web development.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'python-coding',
    title: 'Python Programming Quiz',
    description: 'Test your Python programming knowledge with coding challenges',
    category: 'Coding',
    difficulty: 'Hard',
    totalPoints: 200,
    timeLimit: 25,
    icon: 'Code',
    questions: [
      {
        id: 1,
        question: "What will be the output of: print(type([]))?",
        options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
        correctAnswer: 1,
        explanation: "[] creates an empty list, so type([]) returns <class 'list'>.",
        difficulty: 'Easy',
        points: 15
      },
      {
        id: 2,
        question: "Which method is used to add an element to the end of a list in Python?",
        options: ["add()", "append()", "insert()", "extend()"],
        correctAnswer: 1,
        explanation: "The append() method adds a single element to the end of a list.",
        difficulty: 'Easy',
        points: 15
      },
      {
        id: 3,
        question: "What is the output of: len('Hello\\nWorld')?",
        options: ["10", "11", "12", "Error"],
        correctAnswer: 1,
        explanation: "The string 'Hello\\nWorld' has 11 characters including the newline character \\n.",
        difficulty: 'Medium',
        points: 20
      },
      {
        id: 4,
        question: "What does the following code return: [x**2 for x in range(3)]?",
        options: ["[0, 1, 2]", "[0, 1, 4]", "[1, 4, 9]", "Error"],
        correctAnswer: 1,
        explanation: "This list comprehension squares each number in range(3), which is [0, 1, 2], resulting in [0, 1, 4].",
        difficulty: 'Medium',
        points: 25
      },
      {
        id: 5,
        question: "What is the difference between '==' and 'is' in Python?",
        options: [
          "No difference, they work the same",
          "'==' compares values, 'is' compares object identity",
          "'==' compares object identity, 'is' compares values",
          "Both are used for assignment"
        ],
        correctAnswer: 1,
        explanation: "'==' compares if two objects have the same value, while 'is' compares if two objects are the same object in memory.",
        difficulty: 'Hard',
        points: 30
      },
      {
        id: 6,
        question: "What is the output of: print(*[1, 2, 3], sep='-')?",
        options: ["1-2-3", "[1, 2, 3]", "1 2 3", "Error"],
        correctAnswer: 0,
        explanation: "The * operator unpacks the list, and sep='-' sets the separator for print(), resulting in '1-2-3'.",
        difficulty: 'Medium',
        points: 20
      },
      {
        id: 7,
        question: "Which Python library is primarily used for data manipulation and analysis?",
        options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
        correctAnswer: 1,
        explanation: "Pandas is the go-to library for data manipulation and analysis in Python.",
        difficulty: 'Easy',
        points: 15
      },
      {
        id: 8,
        question: "What does the 'lambda' keyword do in Python?",
        options: [
          "Creates a class",
          "Creates an anonymous function",
          "Imports a module",
          "Defines a variable"
        ],
        correctAnswer: 1,
        explanation: "Lambda creates anonymous functions that can be used inline, especially useful with functions like map(), filter(), and reduce().",
        difficulty: 'Medium',
        points: 20
      },
      {
        id: 9,
        question: "What is the output of: list(map(lambda x: x*2, [1, 2, 3]))?",
        options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "Error"],
        correctAnswer: 1,
        explanation: "map() applies the lambda function (x*2) to each element in the list, doubling each value.",
        difficulty: 'Hard',
        points: 25
      },
      {
        id: 10,
        question: "Which of the following is NOT a mutable data type in Python?",
        options: ["List", "Dictionary", "Set", "Tuple"],
        correctAnswer: 3,
        explanation: "Tuples are immutable in Python, meaning their contents cannot be changed after creation.",
        difficulty: 'Medium',
        points: 20
      }
    ]
  },
  {
    id: 'career-poll',
    title: 'Will AI Take Your Job? Poll',
    description: 'Interactive poll about AI impact on various careers and job prospects',
    category: 'Fun',
    difficulty: 'Easy',
    totalPoints: 80,
    timeLimit: 10,
    icon: 'Target',
    questions: [
      {
        id: 1,
        question: "Do you think AI will completely replace software developers in the next 10 years?",
        options: ["Yes, completely", "Partially, for simple tasks", "No, but will augment their work", "Not at all"],
        correctAnswer: 2,
        explanation: "Most experts believe AI will augment developers' work rather than replace them completely, helping with routine tasks while humans focus on creative problem-solving.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which job role do you think is MOST safe from AI automation?",
        options: ["Data Entry Clerk", "Creative Artist", "Customer Service Rep", "Accountant"],
        correctAnswer: 1,
        explanation: "Creative roles requiring emotional intelligence, artistic vision, and human experience are generally considered safer from AI automation.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "What percentage of current jobs do you think will be significantly impacted by AI by 2030?",
        options: ["Less than 25%", "25-50%", "50-75%", "More than 75%"],
        correctAnswer: 1,
        explanation: "Studies suggest 25-50% of jobs will be significantly impacted, but this includes both job displacement and job enhancement.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 4,
        question: "If you could choose one AI skill to learn today, what would it be?",
        options: ["Prompt Engineering", "Machine Learning", "AI Ethics", "Data Analysis"],
        correctAnswer: 1,
        explanation: "While all are valuable, Machine Learning provides the foundational understanding needed for the AI-driven future across multiple industries.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "Do you think AI will create more jobs than it eliminates?",
        options: ["Yes, definitely", "Probably yes", "Probably no", "No, definitely not"],
        correctAnswer: 1,
        explanation: "Historical patterns with technology suggest new types of jobs typically emerge, though there may be transition challenges.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 6,
        question: "Which industry do you think will be MOST transformed by AI?",
        options: ["Healthcare", "Education", "Transportation", "Entertainment"],
        correctAnswer: 0,
        explanation: "Healthcare is seeing rapid AI adoption in diagnostics, drug discovery, personalized medicine, and treatment planning.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 7,
        question: "What's your biggest concern about AI in the workplace?",
        options: ["Job displacement", "Privacy issues", "Bias and fairness", "Over-dependence on technology"],
        correctAnswer: 2,
        explanation: "While all are valid concerns, bias and fairness in AI systems can have far-reaching societal impacts that need careful attention.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 8,
        question: "How prepared do you feel for the AI-driven job market?",
        options: ["Very prepared", "Somewhat prepared", "Not very prepared", "Not prepared at all"],
        correctAnswer: 1,
        explanation: "Most people fall into 'somewhat prepared' - awareness is growing, but continuous learning and adaptation are key.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'ai-tools-quiz',
    title: 'AI Tools & Technologies',
    description: 'Test your knowledge of popular AI tools, frameworks, and technologies',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 120,
    timeLimit: 18,
    icon: 'Zap',
    questions: [
      {
        id: 1,
        question: "Which company developed the ChatGPT language model?",
        options: ["Google", "OpenAI", "Meta", "Microsoft"],
        correctAnswer: 1,
        explanation: "ChatGPT was developed by OpenAI, founded by Sam Altman and others.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "What does 'GPT' stand for in ChatGPT?",
        options: [
          "General Purpose Technology",
          "Generative Pre-trained Transformer",
          "Global Processing Tool",
          "Generative Programming Tool"
        ],
        correctAnswer: 1,
        explanation: "GPT stands for Generative Pre-trained Transformer, a type of neural network architecture.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 3,
        question: "Which deep learning framework was developed by Google?",
        options: ["PyTorch", "TensorFlow", "Keras", "Caffe"],
        correctAnswer: 1,
        explanation: "TensorFlow was developed by Google and is one of the most popular deep learning frameworks.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 4,
        question: "What is DALL-E primarily used for?",
        options: [
          "Text generation",
          "Image generation from text",
          "Speech recognition",
          "Language translation"
        ],
        correctAnswer: 1,
        explanation: "DALL-E is an AI system that generates images from textual descriptions.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 5,
        question: "Which technique is commonly used for training large language models?",
        options: [
          "Supervised learning only",
          "Unsupervised learning only",
          "Self-supervised learning",
          "Reinforcement learning only"
        ],
        correctAnswer: 2,
        explanation: "Self-supervised learning allows models to learn from large amounts of unlabeled text data.",
        difficulty: 'Hard',
        points: 20
      },
      {
        id: 6,
        question: "What is the primary advantage of using Jupyter Notebooks for data science?",
        options: [
          "Faster execution speed",
          "Interactive development and documentation",
          "Better security",
          "Lower memory usage"
        ],
        correctAnswer: 1,
        explanation: "Jupyter Notebooks allow interactive development with code, visualizations, and documentation in one place.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 7,
        question: "Which cloud platform offers pre-trained AI models through AutoML?",
        options: ["Only AWS", "Only Google Cloud", "Only Azure", "All major cloud platforms"],
        correctAnswer: 3,
        explanation: "AWS, Google Cloud, and Azure all offer AutoML services with pre-trained models.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 8,
        question: "What is the main purpose of using Docker in AI/ML projects?",
        options: [
          "Data visualization",
          "Environment consistency and deployment",
          "Data storage",
          "Model training acceleration"
        ],
        correctAnswer: 1,
        explanation: "Docker ensures consistent environments across development, testing, and production for AI/ML applications.",
        difficulty: 'Hard',
        points: 20
      }
    ]
  },
  {
    "id": "ml-algorithms",
    "title": "Machine Learning Algorithms",
    "description": "Quiz on core machine learning algorithms and concepts",
    "category": "AI/ML",
    "difficulty": "Medium",
    "totalPoints": 100,
    "timeLimit": 12,
    "icon": "Cpu",
    "questions": [
      {
        "id": 1,
        "question": "Which algorithm is best for classifying emails as spam or not spam?",
        "options": ["Linear Regression", "Naive Bayes", "K-Means", "PCA"],
        "correctAnswer": 1,
        "explanation": "Naive Bayes works well for text classification tasks like spam detection.",
        "difficulty": "Easy",
        "points": 15
      },
      {
        "id": 2,
        "question": "Which ML algorithm is commonly used for clustering?",
        "options": ["Decision Trees", "K-Means", "SVM", "Logistic Regression"],
        "correctAnswer": 1,
        "explanation": "K-Means is widely used for unsupervised clustering tasks.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 3,
        "question": "Which algorithm uses the concept of entropy and information gain?",
        "options": ["KNN", "Decision Trees", "SVM", "Linear Regression"],
        "correctAnswer": 1,
        "explanation": "Decision Trees use entropy and information gain to split nodes.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 4,
        "question": "Which ML algorithm is considered a non-parametric method?",
        "options": ["Linear Regression", "Naive Bayes", "KNN", "Logistic Regression"],
        "correctAnswer": 2,
        "explanation": "KNN is a non-parametric algorithm because it makes no assumptions about data distribution.",
        "difficulty": "Hard",
        "points": 25
      },
      {
        "id": 5,
        "question": "Which algorithm is suitable for predicting continuous numerical values?",
        "options": ["Logistic Regression", "Decision Trees", "Linear Regression", "SVM"],
        "correctAnswer": 2,
        "explanation": "Linear Regression predicts continuous target variables.",
        "difficulty": "Easy",
        "points": 20
      }
    ]
  },
  {
    "id": "deep-learning",
    "title": "Deep Learning & Neural Networks",
    "description": "Quiz on neural networks and deep learning fundamentals",
    "category": "AI/ML",
    "difficulty": "Hard",
    "totalPoints": 100,
    "timeLimit": 15,
    "icon": "Activity",
    "questions": [
      {
        "id": 1,
        "question": "What does a convolutional neural network (CNN) specialize in?",
        "options": ["Text analysis", "Image processing", "Speech synthesis", "Data cleaning"],
        "correctAnswer": 1,
        "explanation": "CNNs are designed for image and video processing tasks.",
        "difficulty": "Easy",
        "points": 20
      },
      {
        "id": 2,
        "question": "Which optimizer is commonly used in deep learning?",
        "options": ["Gradient Descent", "Adam", "RMSProp", "All of the above"],
        "correctAnswer": 3,
        "explanation": "All these optimizers are widely used depending on the use case.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 3,
        "question": "What is dropout used for in neural networks?",
        "options": ["Speeding up training", "Preventing overfitting", "Improving accuracy", "Initializing weights"],
        "correctAnswer": 1,
        "explanation": "Dropout randomly ignores neurons during training to prevent overfitting.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 4,
        "question": "Which type of neural network is best for sequential data?",
        "options": ["CNN", "RNN", "GAN", "DBN"],
        "correctAnswer": 1,
        "explanation": "RNNs are designed for sequential data like time series or text.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 5,
        "question": "GANs are primarily used for?",
        "options": ["Data classification", "Image generation", "Data cleaning", "Data compression"],
        "correctAnswer": 1,
        "explanation": "GANs generate synthetic images and other data.",
        "difficulty": "Hard",
        "points": 20
      }
    ]
  },
  {
    "id": "nlp-quiz",
    "title": "Natural Language Processing (NLP)",
    "description": "Test your knowledge of NLP concepts and techniques",
    "category": "AI/ML",
    "difficulty": "Medium",
    "totalPoints": 100,
    "timeLimit": 15,
    "icon": "MessageCircle",
    "questions": [
      {
        "id": 1,
        "question": "What does NLP stand for?",
        "options": ["Natural Language Processing", "Neural Language Programming", "Natural Logic Processing", "None of the above"],
        "correctAnswer": 0,
        "explanation": "NLP is Natural Language Processing, a branch of AI that focuses on language.",
        "difficulty": "Easy",
        "points": 20
      },
      {
        "id": 2,
        "question": "Which technique converts words into numerical vectors?",
        "options": ["Stemming", "Lemmatization", "Word Embeddings", "Parsing"],
        "correctAnswer": 2,
        "explanation": "Word embeddings like Word2Vec or GloVe represent words as numerical vectors.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 3,
        "question": "What does TF-IDF measure?",
        "options": ["Word frequency", "Importance of a word in a document", "Sentence length", "Stop words"],
        "correctAnswer": 1,
        "explanation": "TF-IDF measures word importance in a document relative to a collection of documents.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 4,
        "question": "Which model introduced the concept of self-attention?",
        "options": ["RNN", "CNN", "Transformer", "GAN"],
        "correctAnswer": 2,
        "explanation": "Transformers introduced self-attention, which is key in NLP models like BERT and GPT.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 5,
        "question": "Which NLP task focuses on identifying entities in text?",
        "options": ["POS Tagging", "NER", "Parsing", "Topic Modeling"],
        "correctAnswer": 1,
        "explanation": "NER stands for Named Entity Recognition, which identifies entities like names, dates, etc.",
        "difficulty": "Medium",
        "points": 20
      }
    ]
  },
  {
    "id": "cv-quiz",
    "title": "Computer Vision Basics",
    "description": "Quiz on computer vision concepts and applications",
    "category": "AI/ML",
    "difficulty": "Medium",
    "totalPoints": 100,
    "timeLimit": 15,
    "icon": "Camera",
    "questions": [
      {
        "id": 1,
        "question": "What is the primary goal of computer vision?",
        "options": ["Data encryption", "Extracting information from images", "Sorting datasets", "Speech recognition"],
        "correctAnswer": 1,
        "explanation": "Computer vision focuses on extracting information from images and videos.",
        "difficulty": "Easy",
        "points": 20
      },
      {
        "id": 2,
        "question": "Which library is most commonly used for computer vision in Python?",
        "options": ["NumPy", "Pandas", "OpenCV", "Matplotlib"],
        "correctAnswer": 2,
        "explanation": "OpenCV is the most popular computer vision library.",
        "difficulty": "Easy",
        "points": 20
      },
      {
        "id": 3,
        "question": "Which task is YOLO architecture mainly designed for?",
        "options": ["Image classification", "Object detection", "Image segmentation", "Face recognition"],
        "correctAnswer": 1,
        "explanation": "YOLO is a real-time object detection model.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 4,
        "question": "Which neural network is widely used for image classification?",
        "options": ["RNN", "CNN", "GAN", "DBN"],
        "correctAnswer": 1,
        "explanation": "CNNs are specialized for image classification tasks.",
        "difficulty": "Medium",
        "points": 20
      },
      {
        "id": 5,
        "question": "What does 'image augmentation' help with?",
        "options": ["Reducing dataset size", "Improving model generalization", "Compressing images", "Removing noise"],
        "correctAnswer": 1,
        "explanation": "Image augmentation creates variations of images to improve model generalization.",
        "difficulty": "Medium",
        "points": 20
      }
    ]
  }
];

export default Quizdata