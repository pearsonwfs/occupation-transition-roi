import {
  SearchInput,
  StackableCard,
  StatusTag,
  Typography,
  Theme,
} from '@pearsonwfs/component-library';
import { useState } from 'react';
import { occupationRecommender } from '../../apis/occupationRecommender';
import { Wrapper, ResultsWrapper, StackedCards } from './SampleApp.styles';

export const SampleApp = ({
  accessToken = 'accessToken',
}: {
  accessToken?: string;
}) => {
  const [data, setData] = useState([]);
  const [occupation, setOccupation] = useState<string>('');
  const handleCallApi = async (occupationId: string) => {
    const res = await occupationRecommender({
      occupation: occupationId,
      accessToken,
    });
    setData(res);
  };

  return (
    <Theme theme="workforce">
      <Wrapper>
        {/* DO NOT DELETE THE THEME WRAPPER */}
        <Typography
          component="h1"
          variant="displayXLBold"
          hasDefaultParagraphSpacing
        >
          Occupation Recommender
        </Typography>

        <SearchInput
          variant="manual"
          label="Occupation ID"
          id="occupation-searchbar"
          placeholder="Search for an occupation ID"
          searchTerm={occupation}
          onSearch={(searchTerm: string) => handleCallApi(searchTerm)}
          onClear={() => setOccupation}
          onClickSearch={(searchTerm: string) => handleCallApi(searchTerm)}
        />

        {data.length > 0 && (
          <ResultsWrapper>
            <Typography
              component="h2"
              variant="displayL"
              hasDefaultParagraphSpacing
            >
              Results
            </Typography>
            <StackedCards>
              {data?.map((item: any, index: number) => (
                <StackableCard
                  key={index}
                  cardHeader={item?.name}
                  headerLevel="h2"
                  cardBody={item?.description}
                >
                  <StatusTag
                    colorVariant="primary-light"
                    name={item?.id}
                    shape="square"
                    size="large"
                  ></StatusTag>
                </StackableCard>
              ))}
            </StackedCards>
          </ResultsWrapper>
        )}
      </Wrapper>
    </Theme>
  );
};
