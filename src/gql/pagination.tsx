import { gql } from '@apollo/client';
import { faker } from '@faker-js/faker';
import UpdateIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { Badge, Button, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { motion } from 'framer-motion';
import React, { startTransition, Suspense, useCallback, useEffect } from 'react';
import {
	ScoreChangedDocument,
	type ScoreChangedSubscription,
	type ScoreChangedSubscriptionVariables,
	useCreateUserMutation,
	useDeleteUserMutation,
	useGetUsersConnectionQuery,
	useGetUsersLazyQuery,
	useGetUserLazyQuery,
	useGetUsersSuspenseQuery,
	useScoreChangedSubscription,
	useUpdateUserMutation,
	useGetUserInlineFragmentLazyQuery,
} from '../generated/graphql';

export default function Page() {
	const theme = useTheme();

	// const { data: userData, refetch, subscribeToMore } = useGetUsersSuspenseQuery();
	const [
		fetchSpecificUser,
		{ called: fetchSpecificUserCalled, loading: fetchSpecificUserLoading, data: fetchSpecificUserData },
	] = useGetUserLazyQuery();

	const [
		fetchSpecificUserInline,
		{
			called: fetchSpecificUserInlineCalled,
			loading: fetchSpecificUserInlineLoading,
			data: fetchSpecificUserInlineData,
		},
	] = useGetUserInlineFragmentLazyQuery();

	const {
		data: usersConnectionData,
		refetch,
		fetchMore,
		subscribeToMore,
	} = useGetUsersConnectionQuery({
		variables: {
			after: null,
			first: 10,
			before: null,
			last: 10,
		},
	});

	const edges = usersConnectionData?.usersConnection?.edges;
	const users = edges?.map((edge) => edge?.node);

	const firstUserId = users?.[0].id;
	useEffect(() => {
		const unsubscribe = subscribeToMore<ScoreChangedSubscription, ScoreChangedSubscriptionVariables>({
			document: ScoreChangedDocument,
			variables: {
				// id: firstUserId,
			},
			updateQuery: (previousQueryResult, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return previousQueryResult;
				}
				const {
					scoreChanged: { id, score },
				} = subscriptionData.data;

				return {
					...previousQueryResult,
					users: (previousQueryResult?.users || []).map((user) => {
						if (user.id === id) {
							return {
								...user,
								score,
							};
						}
						return user;
					}),
				};
			},
		});
		return () => {
			unsubscribe();
		};
	}, [subscribeToMore /*, firstUserId*/]);

	// const { data } = useScoreChangedSubscription({
	// 	variables: {
	// 		id: firstUserId,
	// 	},
	// });

	const refetchUsers = useCallback(() => {
		startTransition(() => {
			void refetch();
		});
	}, [refetch]);

	const [createUser] = useCreateUserMutation({
		update: (cache, { data }) => {
			if (!data) return;
			cache.modify({
				fields: {
					users(existingUsers = []) {
						const newUserRef = cache.writeFragment({
							data: data.createUser,
							fragment: gql`
                fragment NewUser on User {
                  id
                  email
                  firstName
                  lastName
                }
              `,
						});
						return [...existingUsers, newUserRef];
					},
				},
			});
		},
		// refetchQueries: ['getUsers'],
	});

	const [updateUser] = useUpdateUserMutation();

	const [deleteUser] = useDeleteUserMutation({
		update(cache, { data }) {
			const id = data?.deleteUser;
			if (!id) return;
			const normalizedId = cache.identify({ id, __typename: 'User' });
			cache.evict({ id: normalizedId });
			cache.gc();
		},
	});

	const handleCreateUserClick = useCallback(async () => {
		try {
			const { data } = await createUser({
				variables: {
					input: createRandomUser(),
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [createUser]);

	const handleUpdateUserClick = async (id: string) => {
		try {
			const { data } = await updateUser({
				variables: {
					input: {
						id,
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
					},
				},
			});
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteUserClick = async (id: string) => {
		try {
			const { data } = await deleteUser({
				variables: {
					id,
				},
			});
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	if (!users) {
		return 'No users';
	}

	return (
		<Suspense>
			<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
				<Box padding={1} sx={{ display: 'flex', borderBottom: `1px solid ${theme.palette.divider}`, gap: 1 }}>
					<Button variant={'contained'} onClick={refetchUsers}>
						Refetch Users
					</Button>
					<Button
						variant={'contained'}
						onClick={() =>
							fetchSpecificUser({
								variables: {
									id: '3',
								},
							})
						}
					>
						Fetch user #3
					</Button>
					{fetchSpecificUserCalled && !fetchSpecificUserLoading ? fetchSpecificUserData?.users?.[0].email : undefined}
					<Button
						variant={'contained'}
						onClick={() =>
							fetchSpecificUserInline({
								variables: {
									id: '3',
								},
							})
						}
					>
						Fetch user inline #3
					</Button>
					{fetchSpecificUserInlineCalled && !fetchSpecificUserInlineLoading
						? fetchSpecificUserInlineData?.users?.[0].email
						: undefined}
				</Box>
				<List sx={{ padding: 0, flex: '1', overflowY: 'auto' }}>
					{users.map((user) => {
						return (
							<ListItem
								key={user.email}
								sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
								secondaryAction={
									<Box>
										<IconButton edge="end" aria-label="update" onClick={(event) => handleUpdateUserClick(user.id)}>
											<UpdateIcon />
										</IconButton>
										<IconButton edge="end" aria-label="delete" onClick={(event) => handleDeleteUserClick(user.id)}>
											<DeleteIcon />
										</IconButton>
									</Box>
								}
							>
								<ListItemText>
									<Typography variant="h6" component="p">
										{user.firstName} {user.lastName}
										<Badge
											badgeContent={
												<motion.span
													key={user.score}
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.3 }}
												>
													{user.score}
												</motion.span>
											}
											color="primary"
										>
											<StarIcon color="action" />
										</Badge>
									</Typography>
									<Typography variant="body1" component="p">
										{user.email}
									</Typography>
								</ListItemText>
							</ListItem>
						);
					})}
				</List>
				<Box padding={1} sx={{ borderTop: `1px solid ${theme.palette.divider}`, flex: '0', height: '50px' }}>
					<Button variant={'contained'} onClick={handleCreateUserClick}>
						Create user
					</Button>
				</Box>
			</Box>
		</Suspense>
	);
}

export function createRandomUser() {
	return {
		email: faker.internet.email(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		score: faker.number.int({ min: 0, max: 100 }),
	};
}
