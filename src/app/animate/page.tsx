'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CardToModalLayoutIdFixed() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const items = [
    {
      id: '1',
      title: 'Mountain View',
      color: '#3b82f6',
      desc: 'A beautiful scenic mountain landscape.',
    },
    {
      id: '2',
      title: 'Ocean Sunset',
      color: '#f59e0b',
      desc: 'Calm waves under a warm sunset sky.',
    },
    {
      id: '3',
      title: 'Forest Path',
      color: '#10b981',
      desc: 'A peaceful trail through dense green woods.',
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', gap: 20, position: 'relative' }}>
        {/* Cards */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            style={{
              width: 200,
              height: 120,
              background: item.color,
              borderRadius: 12,
              cursor: 'pointer',
              padding: 16,
              color: 'white',
            }}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{item.title}</h3>
            <p>Click to expand</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                zIndex: 100,
              }}
            />

            {/* Modal with SAME layoutId */}
            <motion.div
              layoutId={selectedId}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: items.find((i) => i.id === selectedId)?.color,
                borderRadius: 20,
                padding: 30,
                width: '90%',
                maxWidth: 500,
                color: 'white',
                zIndex: 101,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content */}
              <button onClick={() => setSelectedId(null)}>×</button>
              <h2>{items.find((i) => i.id === selectedId)?.title}</h2>
              {/* ... */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
