import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from './core/morphing-dialog';
import { PlusIcon } from 'lucide-react';

export function PortfolioCard() {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-50/10 bg-zinc-900 hover:scale-105 hover:border-zinc-50/20 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-zinc-50/5'
      >
        <MorphingDialogImage
          src='/assets/david_ote1.jpg'
          alt='David Otero professional photo'
          className='h-[286px] w-[270px] object-cover object-[center_20%]'
        />
        <div className='flex grow flex-row items-end justify-between px-3 py-2'>
          <div>
            <MorphingDialogTitle className='text-zinc-50'>
              Overtime Elite Finals
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-zinc-400'>
              March, 2024
            </MorphingDialogSubtitle>
          </div>
          <button
            type='button'
            className='relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-50/10 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus-visible:ring-2 active:scale-[0.98] dark:focus-visible:ring-zinc-500'
            aria-label='Open dialog'
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: '24px',
          }}
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-50/10 bg-zinc-900 sm:w-[800px]'
        >
          <MorphingDialogImage
            src='/assets/david_ote1.jpg'
            alt='David Otero professional photo'
            className='h-[450px] w-full object-cover object-[center_20%]'
          />
          <div className='p-6'>
            <MorphingDialogTitle className='text-2xl text-zinc-50'>
            Overtime Elite Finals
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-zinc-400'>
              March, 2024
            </MorphingDialogSubtitle>
            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className='mt-2 text-zinc-500'>
                This is me after shooting the last game of the Finals for Overtime Elite, a Professional Basketball league based in Atlanta, GA.
              </p>
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className='text-zinc-50' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
