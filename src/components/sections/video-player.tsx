"use client"

import ReactPlayer from "react-player"
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaPlaybackRateButton,
  MediaPipButton,
} from "media-chrome/react"

type VideoPlayerProps = {
  url: string
  className?: string
}

export default function VideoPlayer({ url, className }: VideoPlayerProps) {
  return (
    <div
      className={[
        "group relative aspect-video  overflow-hidden bg-black",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MediaController
        className="
          absolute inset-0
          h-full w-full
          overflow-hidden
          bg-black
        "
      >
        <ReactPlayer
          slot="media"
          src={url}
          width="100%"
          height="100%"
          controls={false}
          className="
            absolute inset-0
            h-full w-full
            object-contain
          "
        />

        <MediaPlayButton
          noTooltip
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            size-28
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border-0
            bg-primary/30
            text-primary-foreground
            shadow-[0_8px_40px_rgba(0,0,0,0.25)]
            backdrop-blur-[2px]
            transition-all
            duration-300
            ease-out
            hover:scale-110
            hover:bg-primary/40
            active:scale-95
            [&::part(icon)]:size-14
            [&::part(icon)]:rounded-xl
            [&::part(icon)]:fill-current
          "
        />

        <MediaControlBar
          className="
            absolute
            inset-x-0
            bottom-0
            z-30
            flex
            h-auto
            items-center
            gap-1
            border-0
            bg-gradient-to-t
            from-black/90
            via-black/60
            to-transparent
            px-4
            pb-3
            pt-10
          "
        >
          <MediaPlayButton
            noTooltip
            className="size-9 rounded-lg border-0 bg-transparent text-white hover:bg-white/10"
          />

          <MediaMuteButton
            noTooltip
            className="size-9 rounded-lg border-0 bg-transparent text-white hover:bg-white/10"
          />

          <MediaVolumeRange
            className="
              w-20
              border-0
              bg-transparent
              text-white
              [direction:ltr]
              [&::part(runnable-track)]:h-1
              [&::part(runnable-track)]:rounded-full
              [&::part(runnable-track)]:bg-white/30
              [&::part(track-fill)]:h-1
              [&::part(track-fill)]:rounded-full
              [&::part(track-fill)]:bg-primary
              [&::part(thumb)]:size-3
              [&::part(thumb)]:rounded-full
              [&::part(thumb)]:border-0
              [&::part(thumb)]:bg-primary
            "
          />

          <MediaTimeDisplay
            className="
              mx-2
              border-0
              bg-transparent
              text-xs
              tabular-nums
              text-white
            "
          />

          <MediaTimeRange
            className="
              min-w-0
              flex-1
              border-0
              bg-transparent
              [direction:ltr]
              [&::part(runnable-track)]:h-1
              [&::part(runnable-track)]:rounded-full
              [&::part(track-fill)]:h-1
              [&::part(track-fill)]:rounded-full
              [&::part(track-fill)]:bg-primary
              [&::part(thumb)]:size-3
              [&::part(thumb)]:rounded-full
              [&::part(thumb)]:border-0
              [&::part(thumb)]:bg-primary
            "
          />

          <MediaPlaybackRateButton
            noTooltip
            className="h-9 rounded-lg border-0 bg-transparent px-2 text-xs text-white hover:bg-white/10"
          />

          <MediaPipButton
            noTooltip
            className="size-9 rounded-lg border-0 bg-transparent text-white hover:bg-white/10"
          />

          <MediaFullscreenButton
            noTooltip
            className="size-9 rounded-lg border-0 bg-transparent text-white hover:bg-white/10"
          />
        </MediaControlBar>
      </MediaController>
    </div>
  )
}
