# deploy.sh
echo "Starting Prometheus Kubernetes setup..."

if [ "$1" == "--gcloud" ]; then
    echo "Setting up prerequisites..."
    ACCOUNT=$(gcloud info --format='value(config.account)')
    kubectl create clusterrolebinding owner-cluster-admin-binding \
        --clusterrole cluster-admin \
        --user $ACCOUNT
fi

echo "Creating namespace for prometheus..."
kubectl create namespace monitoring

echo "Creating cluster role and role binding for prometheus..."
kubectl apply -f prometheus-role.yaml

echo "Creating prometheus config map..."
kubectl apply -f prometheus-configmap.yaml

echo "Creating prometheus deployment..."
kubectl apply -f prometheus-deployment.yaml

echo "Getting the deployment name..."
kubectl get deployments --namespace=monitoring

echo "Exposing the prometheus deployment using a service..."
kubectl apply -f prometheus-service.yaml

echo "Accessing prometheus through the service on node port 30000..."
kubectl get svc -n monitoring

echo "Prometheus Kubernetes setup completed."
