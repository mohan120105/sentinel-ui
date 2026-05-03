import { Lock, CheckCircle2 } from 'lucide-react'

/**
 * SentinelReasoning Component
 *
 * Displays the sentinel_reasoning field from the API response with conditional
 * styling based on the retrieval_tier (match classification).
 *
 * Architectural purpose:
 * - Provides transparency into the policy retrieval decision-making process
 * - Shows the Sentinel system's strategic analysis of query classification
 * - Applies context-aware visual indicators (access denied vs. exact match)
 */
function SentinelReasoning({ reasoning, matchTier }) {
  if (!reasoning) return null

  // Determine styling based on match tier
  const isAccessDenied = matchTier === 'no_match' || matchTier === 'access_denied'
  const isExactMatch = matchTier === 'exact'
  const isPartialMatch = matchTier === 'partial'

  const containerClasses = isAccessDenied
    ? 'bg-red-950/20 border-l-4 border-red-600/60 border-r border-t border-b border-red-700/30'
    : isExactMatch
      ? 'bg-blue-950/20 border-l-4 border-green-600/60 border-r border-t border-b border-blue-700/30'
      : isPartialMatch
        ? 'bg-yellow-950/20 border-l-4 border-yellow-600/60 border-r border-t border-b border-yellow-700/30'
        : 'bg-slate-900/20 border-l-4 border-slate-600/60 border-r border-t border-b border-slate-700/30'

  const headerClasses = isAccessDenied
    ? 'text-red-300'
    : isExactMatch
      ? 'text-green-300'
      : isPartialMatch
        ? 'text-yellow-300'
        : 'text-slate-300'

  const textClasses = isAccessDenied
    ? 'text-red-200'
    : isExactMatch
      ? 'text-green-200'
      : isPartialMatch
        ? 'text-yellow-200'
        : 'text-slate-200'

  return (
    <div className={`mt-3 rounded-lg px-4 py-3 ${containerClasses}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
          {isAccessDenied ? (
            <Lock size={16} className="text-red-400" />
          ) : isExactMatch ? (
            <CheckCircle2 size={16} className="text-green-400" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-slate-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${headerClasses}`}>
            🔍 Sentinel Strategic Analysis
          </h4>
          <p className={`text-xs leading-relaxed ${textClasses}`}>{reasoning}</p>
        </div>
      </div>
    </div>
  )
}

export default SentinelReasoning
