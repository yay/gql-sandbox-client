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
	useGetUsersSuspenseQuery,
	useScoreChangedSubscription,
	useUpdateUserMutation,
} from '../generated/graphql';

export default function Page() {
	const theme = useTheme();

	const { data: userData, refetch, subscribeToMore } = useGetUsersSuspenseQuery();
	const users = userData?.users;

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
			<Box padding={1} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Button variant={'contained'} onClick={refetchUsers}>
					Refetch Users
				</Button>
			</Box>
			<List sx={{ padding: 0 }}>
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
			<Box padding={1} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Button variant={'contained'} onClick={handleCreateUserClick}>
					Create user
				</Button>
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
