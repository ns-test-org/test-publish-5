'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          ✨ Todo App
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-2 mb-6"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTodo}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg"
          >
            Add
          </motion.button>
        </motion.div>

        <div className="space-y-2">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                  todo.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                }`}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    todo.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-500 hover:border-green-400'
                  }`}
                >
                  {todo.completed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>

                <motion.span
                  animate={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.6 : 1 
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 text-gray-800 dark:text-gray-200"
                >
                  {todo.text}
                </motion.span>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTodo(todo.id)}
                  className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200 flex items-center justify-center"
                >
                  🗑️
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center py-12 text-gray-500 dark:text-gray-400"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-4xl mb-4"
            >
              📝
            </motion.div>
            <p>No todos yet. Add one above!</p>
          </motion.div>
        )}

        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

