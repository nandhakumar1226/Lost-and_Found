import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itemsApi, matchesApi } from '../../services/api';
import { Item, MatchResult } from '../../types';
import { Badge } from '../../components/common/Badge';
import { ClaimModal } from '../../components/common/ClaimModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ItemImagePlaceholder } from '../../components/common/ItemImagePlaceholder';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Tag,
  ShieldCheck,
  Sparkles,
  Gift,
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [item, setItem] = useState<Item | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimSuccessMessage, setClaimSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchItemDetails(id);
    }
  }, [id]);

  const fetchItemDetails = async (itemId: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await itemsApi.getItemById(itemId);
      setItem(response.data);

      // If item is LOST and active, fetch smart potential matches from backend engine
      if (response.data.type === 'LOST' && response.data.status === 'ACTIVE') {
        try {
          const matchResponse = await matchesApi.getMatches(itemId);
          setMatches(matchResponse.data);
        } catch (mErr) {
          console.error('Failed to fetch matches:', mErr);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load item details.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimSuccess = () => {
    setClaimSuccessMessage('✓ Claim submitted successfully! An admin will review your request.');
    if (id) fetchItemDetails(id);
  };

  if (loading) return <LoadingSpinner message="Fetching item details..." />;

  if (error || !item) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Item Not Found</h2>
        <p className="text-slate-500 text-sm">{error || "The item report you requested could not be found."}</p>
        <Link to="/items" className="btn-primary text-sm inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Results
      </button>

      {claimSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          {claimSuccessMessage}
        </div>
      )}

      {/* Main Item Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Image / Placeholder */}
        <div className="relative min-h-[320px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <ItemImagePlaceholder
            imageUrl={item.imageUrl}
            name={item.name}
            category={item.category}
            type={item.type}
            className="w-full h-full min-h-[320px]"
          />
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <Badge status={item.type} type="type" className="text-sm px-3 py-1 shadow-xs" />
            <Badge status={item.status} type="status" className="text-sm px-3 py-1 shadow-xs" />
          </div>
          <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-mono px-3 py-1 rounded-lg">
            Record ID: {item.itemId}
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              {item.category}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {item.name}
            </h1>

            <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1 pb-2 border-y border-slate-100">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{item.reportedDate}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Description</h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {item.description || 'No description provided.'}
              </p>
            </div>

            {/* Type Specific Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {item.type === 'LOST' ? (
                <>
                  {item.extraField1 && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <span className="text-slate-400 font-medium block">Last Seen Spot</span>
                      <span className="font-semibold text-slate-800">{item.extraField1}</span>
                    </div>
                  )}
                  {item.extraField2 && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs">
                      <span className="text-amber-700 font-medium flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-amber-600" /> Offered Reward
                      </span>
                      <span className="font-bold text-amber-900">{item.extraField2}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {item.extraField1 && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <span className="text-slate-400 font-medium block">Exact Spot Found</span>
                      <span className="font-semibold text-slate-800">{item.extraField1}</span>
                    </div>
                  )}
                  {item.extraField2 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs">
                      <span className="text-blue-700 font-medium flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-blue-600" /> Currently Stored At
                      </span>
                      <span className="font-bold text-blue-900">{item.extraField2}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Reporter Contact */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <span className="text-slate-500 font-medium block">Reported By</span>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {item.reporterName}
                </span>
                <span className="font-mono text-slate-600 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {item.reporterContact}
                </span>
              </div>
            </div>

          </div>

          {/* Action Button */}
          {item.type === 'FOUND' && item.status === 'ACTIVE' && (
            <button
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  setClaimModalOpen(true);
                }
              }}
              className="w-full btn-primary py-3 text-base shadow-md font-semibold"
            >
              <ShieldCheck className="w-5 h-5" />
              Claim This Item
            </button>
          )}
        </div>
      </div>

      {/* Smart Potential Matches Section (for LOST items) */}
      {item.type === 'LOST' && (
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            Smart Potential Matches
          </div>
          <p className="text-slate-600 text-sm">
            Our campus matching engine automatically compares your lost item report against all found items reported by students & staff.
          </p>

          {matches.length === 0 ? (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-sm">
              No matching found items detected above the 30% similarity threshold yet. We will notify you when a matching report is submitted.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {matches.map((match) => (
                <div
                  key={match.foundItem.itemId}
                  className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl flex flex-col justify-between gap-3 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-700 text-white">
                          {match.matchScore}% Match
                        </span>
                        <span className="text-xs font-semibold text-blue-900">
                          {match.matchLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{match.foundItem.name}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{match.foundItem.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-blue-200/60 text-xs text-slate-500">
                    <span>Found at: {match.foundItem.location}</span>
                    <Link
                      to={`/items/${match.foundItem.itemId}`}
                      className="font-bold text-blue-700 hover:underline"
                    >
                      View Match Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Claim Modal */}
      {item && (
        <ClaimModal
          item={item}
          isOpen={claimModalOpen}
          onClose={() => setClaimModalOpen(false)}
          onSuccess={handleClaimSuccess}
        />
      )}

    </div>
  );
};
