import React, { useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { XIcon } from 'lucide-react';

const MorphingDialogContext = React.createContext(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error('useMorphingDialog must be used within a MorphingDialogProvider');
  }
  return context;
}

export function MorphingDialog({ children, transition }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef(null);

  return (
    <MorphingDialogContext.Provider value={{ isOpen, setIsOpen, uniqueId, triggerRef }}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({ children, className, style }) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={() => setIsOpen(!isOpen)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogContainer({ children }) {
  const { isOpen, uniqueId } = useMorphingDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function MorphingDialogContent({ children, className, style }) {
  const { uniqueId, setIsOpen } = useMorphingDialog();
  const contentRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setIsOpen]);

  return (
    <motion.div
      ref={contentRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-hidden', className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogTitle({ children, className }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.div layoutId={`title-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

export function MorphingDialogSubtitle({ children, className }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.div layoutId={`subtitle-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

export function MorphingDialogDescription({ children, className, variants, disableLayoutAnimation }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.div
      layoutId={disableLayoutAnimation ? undefined : `description-${uniqueId}`}
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogImage({ src, alt, className }) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.img
      src={src}
      alt={alt}
      layoutId={`image-${uniqueId}`}
      className={className}
    />
  );
}

export function MorphingDialogClose({ children, className }) {
  const { setIsOpen } = useMorphingDialog();
  return (
    <button
      onClick={() => setIsOpen(false)}
      className={cn('absolute right-4 top-4', className)}
    >
      {children || <XIcon size={24} />}
    </button>
  );
}
