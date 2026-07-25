'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createMeeting, MeetingFormState } from '@/lib/actions';

const initialState: MeetingFormState = {
  message: '',
  errors: {},
};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Meeting</h1>
      
      {state.message && state.message !== 'Validation failed' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {state.message}
        </div>
      )}
      
      <form action={formAction} className="space-y-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            aria-describedby="date-error"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {state.errors?.date && (
            <div id="date-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.date[0]}
            </div>
          )}
        </div>

        {/* Meeting Type */}
        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">
            Meeting Type *
          </label>
          <select
            id="meetingType"
            name="meetingType"
            aria-describedby="meetingType-error"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="regular">Regular Sacrament Meeting</option>
            <option value="testimony">Testimony Meeting</option>
            <option value="stake">Stake Conference</option>
            <option value="general">General Meeting</option>
            <option value="special">Special Meeting</option>
          </select>
          {state.errors?.meetingType && (
            <div id="meetingType-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.meetingType[0]}
            </div>
          )}
        </div>

        {/* Presiding */}
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-gray-700">
            Presiding *
          </label>
          <input
            type="text"
            id="presiding"
            name="presiding"
            aria-describedby="presiding-error"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="President Smith"
          />
          {state.errors?.presiding && (
            <div id="presiding-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.presiding[0]}
            </div>
          )}
        </div>

        {/* Conducting */}
        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-gray-700">
            Conducting *
          </label>
          <input
            type="text"
            id="conducting"
            name="conducting"
            aria-describedby="conducting-error"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Brother Johnson"
          />
          {state.errors?.conducting && (
            <div id="conducting-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.conducting[0]}
            </div>
          )}
        </div>

        {/* Opening Hymn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-gray-700">
              Opening Hymn # *
            </label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber"
              aria-describedby="openingHymnNumber-error"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
            {state.errors?.openingHymnNumber && (
              <div id="openingHymnNumber-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {state.errors.openingHymnNumber[0]}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-gray-700">
              Opening Hymn Title *
            </label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle"
              aria-describedby="openingHymnTitle-error"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="The Spirit of God"
            />
            {state.errors?.openingHymnTitle && (
              <div id="openingHymnTitle-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {state.errors.openingHymnTitle[0]}
              </div>
            )}
          </div>
        </div>

        {/* Opening Prayer */}
        <div>
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-700">
            Opening Prayer *
          </label>
          <input
            type="text"
            id="openingPrayer"
            name="openingPrayer"
            aria-describedby="openingPrayer-error"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Sister Davis"
          />
          {state.errors?.openingPrayer && (
            <div id="openingPrayer-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.openingPrayer[0]}
            </div>
          )}
        </div>

        {/* Sacrament Hymn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-gray-700">
              Sacrament Hymn # *
            </label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
            {state.errors?.sacramentHymnNumber && (
              <div id="sacramentHymnNumber-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {state.errors.sacramentHymnNumber[0]}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-gray-700">
              Sacrament Hymn Title *
            </label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Reverently and Meekly Now"
            />
            {state.errors?.sacramentHymnTitle && (
              <div id="sacramentHymnTitle-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {state.errors.sacramentHymnTitle[0]}
              </div>
            )}
          </div>
        </div>

        {/* Speakers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speakers & Musical Numbers *
          </label>
          <div id="speakers-container" className="space-y-3">
            {/* Speaker 1 */}
            <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <label htmlFor="speakerName-0" className="block text-xs text-gray-600">
                  Name *
                </label>
                <input
                  type="text"
                  id="speakerName-0"
                  name="speakerName"
                  placeholder="Brother Thompson"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="speakerTopic-0" className="block text-xs text-gray-600">
                  Topic *
                </label>
                <input
                  type="text"
                  id="speakerTopic-0"
                  name="speakerTopic"
                  placeholder="Faith in Christ"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="speakerType-0" className="block text-xs text-gray-600">
                  Type *
                </label>
                <select
                  id="speakerType-0"
                  name="speakerType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => {
              const container = document.getElementById('speakers-container');
              if (container) {
                const index = container.children.length;
                const newSpeaker = document.createElement('div');
                newSpeaker.className = 'grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg';
                newSpeaker.innerHTML = `
                  <div>
                    <label for="speakerName-${index}" class="block text-xs text-gray-600">Name *</label>
                    <input type="text" id="speakerName-${index}" name="speakerName" placeholder="Speaker Name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label for="speakerTopic-${index}" class="block text-xs text-gray-600">Topic *</label>
                    <input type="text" id="speakerTopic-${index}" name="speakerTopic" placeholder="Topic" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label for="speakerType-${index}" class="block text-xs text-gray-600">Type *</label>
                    <select id="speakerType-${index}" name="speakerType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                      <option value="speaker">Speaker</option>
                      <option value="musical-number">Musical Number</option>
                    </select>
                  </div>
                `;
                container.appendChild(newSpeaker);
              }
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            + Add Speaker
          </button>
          
          {state.errors?.speakers && (
            <div id="speakers-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.speakers[0]}
            </div>
          )}
        </div>

        {/* Closing Hymn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-gray-700">
              Closing Hymn # *
            </label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              aria-describedby="closingHymnNumber-error"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
            {state.errors?.closingHymnNumber && (
              <div id="closingHymnNumber-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {state.errors.closingHymnNumber[0]}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-gray-700">
              Closing Hymn Title *
            </label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              aria-describedby="closingHymnTitle-error"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Improve the Shining Moments"
            />
            {state.errors?.closingHymnTitle && (
              <div id="closingHymnTitle-error" className="mt-1 text-sm text-red-600" aria-live="polite">
                {state.errors.closingHymnTitle[0]}
              </div>
            )}
          </div>
        </div>

        {/* Closing Prayer */}
        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-700">
            Closing Prayer *
          </label>
          <input
            type="text"
            id="closingPrayer"
            name="closingPrayer"
            aria-describedby="closingPrayer-error"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Brother Williams"
          />
          {state.errors?.closingPrayer && (
            <div id="closingPrayer-error" className="mt-1 text-sm text-red-600" aria-live="polite">
              {state.errors.closingPrayer[0]}
            </div>
          )}
        </div>

        {/* Stake Business Checkbox */}
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="stakeBusiness"
              name="stakeBusiness"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="stakeBusiness" className="ml-2 block text-sm text-gray-700">
              Stake Business will be conducted
            </label>
          </div>
        </div>

        {/* Announcements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Announcements
          </label>
          <div id="announcements-container" className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                name="announcement"
                placeholder="Enter announcement"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const container = document.getElementById('announcements-container');
              if (container) {
                const input = document.createElement('div');
                input.className = 'flex gap-2';
                input.innerHTML = `
                  <input type="text" name="announcement" placeholder="Enter announcement" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                `;
                container.appendChild(input);
              }
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            + Add Announcement
          </button>
        </div>

        {/* Ward Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ward Business
          </label>
          <div id="business-container" className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                name="businessDescription"
                placeholder="Enter ward business"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const container = document.getElementById('business-container');
              if (container) {
                const input = document.createElement('div');
                input.className = 'flex gap-2';
                input.innerHTML = `
                  <input type="text" name="businessDescription" placeholder="Enter ward business" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                `;
                container.appendChild(input);
              }
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            + Add Business Item
          </button>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating...' : 'Create Meeting'}
          </button>
          <Link
            href="/meetings"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}