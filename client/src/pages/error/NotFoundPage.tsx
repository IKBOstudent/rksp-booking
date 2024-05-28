import React from 'react';
import { Button, Container, Flex, Icon, Text } from '@gravity-ui/uikit';
import { Link } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { ArrowUpRightFromSquare } from '@gravity-ui/icons';

export const NotFoundPage: React.FC = () => {
    return (
        <Container maxWidth="m">
            <Flex gap={4} direction="column" style={{ marginTop: 72 }}>
                <Text variant="display-2">404 | Страница не найдена</Text>
                <Link role="button" to={URLs.HomeRoot}>
                    <Button size="xl">
                        <Text variant="subheader-3">Вернуться на главную </Text>
                        <Icon data={ArrowUpRightFromSquare} size={24} />
                    </Button>
                </Link>
            </Flex>
        </Container>
    );
};
