import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Skeleton,
} from '@read-quill/design-system';
import { useFormContext } from 'react-hook-form';
import { useReferralCodes } from '@modules/referrals/hooks/use-referral-codes';
import { useDebounce } from '@modules/common/hooks/use-debounce';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import UserAvatar from '@modules/common/components/users/user-avatar';

const ReferralsFormCodeUsers: React.FC = (props) => {
  const form = useFormContext();
  const debouncedCode = useDebounce(form.getValues('referralCode'), 1000);

  const { data, isLoading, isFetching } = useReferralCodes({ code: debouncedCode });

  return (
    <FormField
      control={form.control}
      name="referralCode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Referral Code</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Unique referral code.</FormDescription>
          <FormMessage />
          {(isLoading || isFetching) && (
            <div className="space-y-2 max-h-72 overflow-y-scroll">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={`placeholder-code-${i}`} className="h-10 w-full" />
              ))}
            </div>
          )}
          {!(isLoading || isFetching) && data?.data?.referralCodes && !data.data.referralCodes.length && (
            <p className="text-muted-foreground">No referral codes found!</p>
          )}
          {!(isLoading || isFetching) && data?.data?.referralCodes && data.data.referralCodes.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-2">Found Referral Codes</p>
              <div className="space-y-2 max-h-72 overflow-y-scroll">
                {data.data.referralCodes.map((code) => {
                  const handleSelectResult = () => {
                    form.setValue('referralCode', code.referralCode);
                  };

                  return (
                    <button
                      key={`referral-code-result-${code.referralCode}`}
                      className="flex gap-2 hover:bg-primary-foreground w-full transition-colors p-1 rounded"
                      onClick={handleSelectResult}
                    >
                      <UserAvatar
                        name={code.name}
                        image={code.avatar?.path ? getImagePublicUrl('UserAvatars', code.avatar?.path) : undefined}
                        alt={`${code.name} Avatar`}
                        width={35}
                        height={35}
                      />
                      <div className="text-start">
                        <h4>{code.name}</h4>
                        <span className="font-extrabold text-primary">{code.referralCode}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default ReferralsFormCodeUsers;
