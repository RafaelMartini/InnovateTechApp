import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Loader = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                padding={10}
            >
                <SkeletonPlaceholder.Item
                    width={70}
                    height={70}
                    borderRadius={35}
                />
                <SkeletonPlaceholder.Item marginLeft={10}>
                    <SkeletonPlaceholder.Item
                        width={120}
                        height={20}
                        borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                        width={80}
                        height={20}
                        marginTop={6}
                        borderRadius={4}
                    />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};

export default Loader;
